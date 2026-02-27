import React, { useState, useEffect } from 'react';
import { supabase, type Post, type PostReply, type DurationType } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { usePosts, usePostReactions, usePostReplies, usePostViews } from '../../hooks/usePosts';
import { Avatar } from '../../components/common/Avatar';
import { Loader } from '../../components/common/Loader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const EMOJI_REACTIONS = ['❤️', '😍', '😂', '😮', '😢', '🔥', '👏', '🎉'];

const FONT_SIZES = [
  { value: 'small', label: 'Small', size: '14px' },
  { value: 'medium', label: 'Medium', size: '18px' },
  { value: 'large', label: 'Large', size: '24px' },
  { value: 'xlarge', label: 'Extra Large', size: '32px' },
];

const DURATION_OPTIONS: { value: DurationType; label: string; days: number }[] = [
  { value: '7days', label: '7 Days', days: 7 },
  { value: '14days', label: '14 Days', days: 14 },
  { value: '30days', label: '30 Days', days: 30 },
  { value: 'permanent', label: 'Permanent', days: 0 },
];

const BACKGROUNDS = [
  { value: 'white', color: '#ffffff', label: 'White' },
  { value: 'black', color: '#000000', label: 'Black' },
  { value: 'red', color: '#fee2e2', label: 'Red' },
  { value: 'blue', color: '#dbeafe', label: 'Blue' },
  { value: 'green', color: '#dcfce7', label: 'Green' },
  { value: 'yellow', color: '#fef9c3', label: 'Yellow' },
  { value: 'purple', color: '#f3e8ff', label: 'Purple' },
  { value: 'pink', color: '#fce7f3', label: 'Pink' },
];

const GRADIENTS = [
  { value: '', label: 'Solid' },
  { value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Purple Dream' },
  { value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'Sunset' },
  { value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'Ocean' },
  { value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'Mint' },
  { value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', label: 'Warm' },
  { value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', label: 'Soft' },
  { value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', label: 'Peach' },
];

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const { user } = useAuthStore();
  const { reactions, userReaction, addReaction, removeReaction } = usePostReactions(post.id);
  const { replies, addReply } = usePostReplies(post.id);
  const { trackView } = usePostViews(post.id);
  const [showReactions, setShowReactions] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  const isOwner = user?.id === post.user_id;

  useEffect(() => {
    trackView();
  }, [post.id, trackView]);

  const handleReaction = async (emoji: string) => {
    if (userReaction === emoji) {
      await removeReaction();
    } else {
      await addReaction(emoji);
    }
    setShowReactions(false);
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setSendingReply(true);
    await addReply(replyText.trim());
    setReplyText('');
    setSendingReply(false);
  };

  const getBackgroundStyle = (): React.CSSProperties => {
    if (post.gradient) {
      return { background: post.gradient };
    }
    return { backgroundColor: post.background_color || 'white' };
  };

  const getTextStyle = (): React.CSSProperties => ({
    color: post.text_color || 'black',
    fontSize: FONT_SIZES.find(f => f.value === post.font_size)?.size || '18px',
    fontStyle: post.font_style || 'normal',
    fontFamily: post.font_family === 'serif' ? 'Georgia, serif' : 
                 post.font_family === 'monospace' ? 'monospace' :
                 post.font_family === 'handwriting' ? '"Comic Sans MS", cursive' : 'inherit',
  });

  return (
    <div className="card" style={{ marginBottom: 16, overflow: 'hidden' }}>
      {/* Post Header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar src={post.user?.avatar_url} name={post.user?.full_name || ''} size={40} />
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, fontSize: 14 }}>{post.user?.full_name}</p>
          <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
            {dayjs(post.created_at).fromNow()} · {post.visibility === 'contacts' ? '👥 Contacts' : '🌐 Everyone'}
          </p>
        </div>
        {isOwner && (
          <button
            onClick={() => onDelete(post.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, fontSize: 16 }}
          >
            🗑️
          </button>
        )}
      </div>

      {/* Post Content */}
      <div style={{ ...getBackgroundStyle(), padding: '20px 16px', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...getTextStyle(), textAlign: 'center', maxWidth: '100%', wordBreak: 'break-word' }}>
          {post.content}
        </p>
      </div>

      {/* Post Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          {/* Reaction count */}
          {reactions.length > 0 && (
            <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
              {reactions.length} reaction{reactions.length > 1 ? 's' : ''}
            </span>
          )}
          {replies.length > 0 && (
            <span 
              style={{ fontSize: 13, color: 'var(--color-text-muted)', marginLeft: 'auto', cursor: 'pointer' }}
              onClick={() => setShowReplies(!showReplies)}
            >
              {replies.length} repl{replies.length > 1 ? 'ies' : 'y'}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          {/* Reaction button */}
          <div style={{ position: 'relative', flex: 1 }}>
            <button
              className="btn-ghost"
              onClick={() => setShowReactions(!showReactions)}
              style={{ width: '100%', fontSize: 14 }}
            >
              {userReaction ? userReaction : '❤️'} React
            </button>
            {showReactions && (
              <div style={{
                position: 'absolute', bottom: '100%', left: 0,
                background: 'var(--color-surface)', borderRadius: 20,
                padding: '4px 8px', display: 'flex', gap: 4,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)', marginBottom: 4,
              }}>
                {EMOJI_REACTIONS.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 20, padding: 4,
                      opacity: userReaction === emoji ? 1 : 0.6,
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="btn-ghost" onClick={() => setShowReplies(!showReplies)} style={{ flex: 1, fontSize: 14 }}>
            💬 Reply
          </button>
        </div>
      </div>

      {/* Replies Section */}
      {showReplies && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
          {replies.map(reply => (
            <div key={reply.id} style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
              <Avatar src={reply.sender?.avatar_url} name={reply.sender?.full_name || ''} size={28} />
              <div>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{reply.sender?.full_name}</span>
                <p style={{ fontSize: 14, marginTop: 2 }}>{reply.message}</p>
                <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>
                  {dayjs(reply.created_at).fromNow()}
                </p>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <input
              type="text"
              className="input-field"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleReply()}
              style={{ flex: 1, fontSize: 14 }}
            />
            <button
              className="btn-primary"
              onClick={handleReply}
              disabled={sendingReply || !replyText.trim()}
              style={{ padding: '8px 16px', width: 'auto' }}
            >
              {sendingReply ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const Posts: React.FC = () => {
  const { user } = useAuthStore();
  const { posts, loading, createPost, deletePost, fetchPosts } = usePosts();
  const [showCompose, setShowCompose] = useState(false);
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<'contacts' | 'anyone'>('anyone');
  const [durationType, setDurationType] = useState<DurationType>('7days');
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [textColor, setTextColor] = useState('black');
  const [fontSize, setFontSize] = useState('medium');
  const [gradient, setGradient] = useState('');
  const [posting, setPosting] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;
    setPosting(true);

    const { error } = await createPost({
      content: content.trim(),
      visibility,
      duration_type: durationType,
      background_color: backgroundColor,
      text_color: textColor,
      font_size: fontSize,
      gradient: gradient || null,
    });

    setPosting(false);
    if (!error) {
      setShowCompose(false);
      setContent('');
      setBackgroundColor('white');
      setTextColor('black');
      setFontSize('medium');
      setGradient('');
    }
  };

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--color-bg)' }}>
      {/* Header */}
      <div style={{ padding: 16, background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Posts</h2>
          <button className="btn-primary" style={{ width: 'auto', padding: '8px 16px', fontSize: 14 }} onClick={() => setShowCompose(true)}>
            + New Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}><Loader /></div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            <span style={{ fontSize: 48 }}>📝</span>
            <p style={{ marginTop: 8, fontWeight: 500 }}>No posts yet</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Create your first post to share with others!</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} onDelete={handleDelete} />
          ))
        )}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="overlay" onClick={() => setShowCompose(false)}>
          <div 
            className="card" 
            style={{ width: '95%', maxWidth: 500, padding: 0, maxHeight: '90vh', overflow: 'auto' }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: 16, borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontWeight: 700, fontSize: 18 }}>Create Post</h3>
              <button onClick={() => setShowCompose(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ padding: 16 }}>
              {/* Preview */}
              <div 
                style={{ 
                  background: gradient || BACKGROUNDS.find(b => b.value === backgroundColor)?.color || 'white',
                  padding: 24, 
                  borderRadius: 12, 
                  marginBottom: 16,
                  minHeight: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p 
                  style={{ 
                    color: textColor,
                    fontSize: FONT_SIZES.find(f => f.value === fontSize)?.size || '18px',
                    textAlign: 'center',
                    maxWidth: '100%',
                  }}
                >
                  {content || 'Your post preview...'}
                </p>
              </div>

              {/* Content Input */}
              <textarea
                className="input-field"
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, 500))}
                placeholder="What's on your mind?"
                maxLength={500}
                rows={3}
                style={{ resize: 'none', width: '100%', marginBottom: 8 }}
              />
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', textAlign: 'right', marginBottom: 16 }}>
                {content.length}/500
              </p>

              {/* Background Selector */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: 'block' }}>Background</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {GRADIENTS.map(g => (
                    <button
                      key={g.label}
                      onClick={() => { setGradient(g.value); setBackgroundColor('white'); }}
                      style={{
                        width: 40, height: 40, borderRadius: 8, border: gradient === g.value ? '3px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: g.value || BACKGROUNDS.find(b => b.value === 'white')?.color,
                        cursor: 'pointer',
                      }}
                      title={g.label}
                    >
                      {g.value ? <span style={{ fontSize: 10 }}>🎨</span> : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Color (only for solid backgrounds) */}
              {!gradient && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: 'block' }}>Text Color</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['black', 'white', '#ef4444', '#3b82f6', '#22c55e', '#eab308'].map(c => (
                      <button
                        key={c}
                        onClick={() => setTextColor(c)}
                        style={{
                          width: 32, height: 32, borderRadius: '50%', border: textColor === c ? '3px solid var(--color-primary)' : '1px solid var(--color-border)',
                          background: c, cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Font Size */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: 'block' }}>Text Size</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {FONT_SIZES.map(f => (
                    <button
                      key={f.value}
                      className="btn-ghost"
                      onClick={() => setFontSize(f.value)}
                      style={{ flex: 1, fontSize: 13, background: fontSize === f.value ? 'var(--color-primary-light)' : undefined }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibility */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: 'block' }}>Visibility</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn-ghost"
                    onClick={() => setVisibility('anyone')}
                    style={{ flex: 1, fontSize: 13, background: visibility === 'anyone' ? 'var(--color-primary-light)' : undefined }}
                  >
                    🌐 Everyone
                  </button>
                  <button
                    className="btn-ghost"
                    onClick={() => setVisibility('contacts')}
                    style={{ flex: 1, fontSize: 13, background: visibility === 'contacts' ? 'var(--color-primary-light)' : undefined }}
                  >
                    👥 Contacts
                  </button>
                </div>
              </div>

              {/* Duration */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: 'block' }}>Expires After</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {DURATION_OPTIONS.map(d => (
                    <button
                      key={d.value}
                      className="btn-ghost"
                      onClick={() => setDurationType(d.value)}
                      style={{ flex: 1, minWidth: 80, fontSize: 13, background: durationType === d.value ? 'var(--color-primary-light)' : undefined }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: 16, borderTop: '1px solid var(--color-border)', display: 'flex', gap: 8 }}>
              <button className="btn-ghost" onClick={() => setShowCompose(false)} style={{ flex: 1 }}>
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handlePost}
                disabled={posting || !content.trim()}
                style={{ flex: 1 }}
              >
                {posting ? 'Posting...' : '📤 Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
