import { useState, useEffect, useCallback } from 'react';
import { supabase, type Post, type PostReaction, type PostReply, type EngagementStats } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

export const usePosts = () => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (currentUserId?: string) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('posts')
        .select('*, user:users(id, full_name, username, avatar_url)')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      
      // Filter posts based on visibility (client-side for now)
      let filteredPosts = data || [];
      
      if (currentUserId) {
        // For now, show all public posts
        filteredPosts = (data || []).filter(p => p.visibility === 'anyone');
      }

      setPosts(filteredPosts as Post[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (postData: Partial<Post>) => {
    if (!user) return { data: null, error: 'Not authenticated' };

    try {
      // Calculate expiry based on duration_type
      let expiresAt: string | null = null;
      const durationMap: Record<string, number> = {
        '7days': 7,
        '14days': 14,
        '30days': 30,
      };

      if (postData.duration_type && postData.duration_type !== 'permanent') {
        const days = durationMap[postData.duration_type] || 7;
        expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      }

      const { data, error: insertError } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: postData.content,
          background_color: postData.background_color || 'white',
          text_color: postData.text_color || 'black',
          font_size: postData.font_size || 'medium',
          font_style: postData.font_style || 'normal',
          font_family: postData.font_family || 'default',
          gradient: postData.gradient || null,
          emoji_overlay: postData.emoji_overlay || null,
          visibility: postData.visibility || 'anyone',
          duration_type: postData.duration_type || '7days',
          expires_at: expiresAt,
        })
        .select('*, user:users(id, full_name, username, avatar_url)')
        .single();

      if (insertError) throw insertError;

      if (data) {
        setPosts(prev => [data as Post, ...prev]);
      }

      return { data: data as Post, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  }, [user]);

  const deletePost = useCallback(async (postId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('posts')
        .update({ is_deleted: true })
        .eq('id', postId);

      if (deleteError) throw deleteError;

      setPosts(prev => prev.filter(p => p.id !== postId));
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, []);

  const getPostStats = useCallback(async (postId: string): Promise<EngagementStats> => {
    const { data, error } = await supabase.rpc('get_post_stats', { post_uuid: postId });
    
    if (error || !data) {
      return { view_count: 0, reaction_count: 0, reply_count: 0 };
    }
    
    return {
      view_count: data[0]?.view_count || 0,
      reaction_count: data[0]?.reaction_count || 0,
      reply_count: data[0]?.reply_count || 0,
    };
  }, []);

  useEffect(() => {
    fetchPosts(user?.id);

    // Subscribe to realtime changes
    const channel = supabase
      .channel('posts_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        // Fetch the new post with user data
        supabase
          .from('posts')
          .select('*, user:users(id, full_name, username, avatar_url)')
          .eq('id', payload.new.id)
          .single()
          .then(({ data }) => {
            if (data && !data.is_deleted) {
              setPosts(prev => [data as Post, ...prev]);
            }
          });
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'posts' }, (payload) => {
        setPosts(prev => prev.map(p => 
          p.id === payload.new.id ? { ...p, ...payload.new } as Post : p
        ));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts, user?.id]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    deletePost,
    getPostStats,
  };
};

export const usePostReactions = (postId: string) => {
  const { user } = useAuthStore();
  const [reactions, setReactions] = useState<PostReaction[]>([]);
  const [userReaction, setUserReaction] = useState<string | null>(null);

  useEffect(() => {
    const fetchReactions = async () => {
      const { data } = await supabase
        .from('post_reactions')
        .select('*')
        .eq('post_id', postId);

      if (data) {
        setReactions(data);
        
        if (user) {
          const myReaction = data.find((r: PostReaction) => r.user_id === user.id);
          setUserReaction(myReaction?.emoji || null);
        }
      }
    };

    fetchReactions();

    const channel = supabase
      .channel('post_reactions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'post_reactions' }, (payload) => {
        if (payload.new?.post_id === postId) {
          fetchReactions();
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, user]);

  const addReaction = useCallback(async (emoji: string) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { error: upsertError } = await supabase
        .from('post_reactions')
        .upsert({
          post_id: postId,
          user_id: user.id,
          emoji,
        }, {
          onConflict: 'post_id,user_id',
        });

      if (upsertError) throw upsertError;
      setUserReaction(emoji);
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, [postId, user]);

  const removeReaction = useCallback(async () => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { error: deleteError } = await supabase
        .from('post_reactions')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;
      setUserReaction(null);
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, [postId, user]);

  return {
    reactions,
    userReaction,
    addReaction,
    removeReaction,
  };
};

export const usePostReplies = (postId: string) => {
  const { user } = useAuthStore();
  const [replies, setReplies] = useState<PostReply[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReplies = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('post_replies')
      .select('*, sender:users(id, full_name, username, avatar_url)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setReplies(data as PostReply[]);
    }
    setLoading(false);
  }, [postId]);

  useEffect(() => {
    fetchReplies();

    const channel = supabase
      .channel('post_replies')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'post_replies' }, (payload) => {
        if (payload.new?.post_id === postId) {
          fetchReplies();
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, fetchReplies]);

  const addReply = useCallback(async (message: string) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      const { error: insertError } = await supabase
        .from('post_replies')
        .insert({
          post_id: postId,
          sender_id: user.id,
          message,
        });

      if (insertError) throw insertError;
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, [postId, user]);

  return {
    replies,
    loading,
    addReply,
    refresh: fetchReplies,
  };
};

export const usePostViews = (postId: string) => {
  const { user } = useAuthStore();

  const trackView = useCallback(async () => {
    if (!user) return;

    try {
      await supabase
        .from('post_views')
        .upsert({
          post_id: postId,
          viewer_id: user.id,
        }, {
          onConflict: 'post_id,viewer_id',
        });
    } catch (err) {
      // Silently fail - view tracking is not critical
    }
  }, [postId, user]);

  return { trackView };
};
