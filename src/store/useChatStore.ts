import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Conversation, Message } from '../lib/supabase';

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  loadingConversations: boolean;
  loadingMessages: boolean;
  setConversations: (c: Conversation[]) => void;
  setMessages: (convId: string, msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
  fetchConversations: (userId: string) => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  getOrCreateConversation: (myId: string, otherId: string) => Promise<string>;
  markAsRead: (conversationId: string, userId: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  messages: {},
  loadingConversations: false,
  loadingMessages: false,

  setConversations: (conversations) => set({ conversations }),
  setMessages: (convId, msgs) => set((s) => ({ messages: { ...s.messages, [convId]: msgs } })),
  addMessage: (msg) => {
    set((s) => ({
      messages: {
        ...s.messages,
        [msg.conversation_id]: [...(s.messages[msg.conversation_id] || []), msg],
      },
    }));
  },

  fetchConversations: async (userId) => {
    set({ loadingConversations: true });
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        user1:users!conversations_participant_1_fkey(id, full_name, username, avatar_url, is_online, last_seen),
        user2:users!conversations_participant_2_fkey(id, full_name, username, avatar_url, is_online, last_seen)
      `)
      .or(`participant_1.eq.${userId},participant_2.eq.${userId}`)
      .order('last_message_at', { ascending: false });
    if (!error && data) {
      const convs: Conversation[] = data.map((c: any) => ({
        ...c,
        other_user: c.participant_1 === userId ? c.user2 : c.user1,
      }));
      set({ conversations: convs });
    }
    set({ loadingConversations: false });
  },

  fetchMessages: async (conversationId) => {
    set({ loadingMessages: true });
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    if (!error && data) {
      set((s) => ({ messages: { ...s.messages, [conversationId]: data as Message[] } }));
    }
    set({ loadingMessages: false });
  },

  getOrCreateConversation: async (myId, otherId) => {
    console.log('getOrCreateConversation called:', myId, otherId);
    
    // Validate that both users exist in users table
    // If not, auto-create missing user records
    const { data: myUser, error: myUserError } = await supabase
      .from('users')
      .select('id, email, full_name')
      .eq('id', myId)
      .maybeSingle();
      
    if (myUserError) {
      console.error('Error checking my user:', myUserError);
    }
    
    if (!myUser) {
      console.log('My user not found in users table, fetching from auth...');
      const { data: authUser } = await supabase.auth.getUser();
      if (authUser?.user) {
        console.log('Creating user record for myself from auth data');
        await supabase.from('users').insert({
          id: authUser.user.id,
          email: authUser.user.email || '',
          full_name: authUser.user.user_metadata?.full_name || 'Unknown User',
          username: `user_${authUser.user.id.slice(0, 8)}`,
          is_online: true,
          profile_public: true,
          theme_config: { colorTheme: 'sky', mode: 'light', bubbleStyle: 'rounded', fontSize: 'medium', background: 'solid' },
        });
      }
    }
    
    const { data: otherUser, error: otherUserError } = await supabase
      .from('users')
      .select('id')
      .eq('id', otherId)
      .maybeSingle();
      
    if (otherUserError) {
      console.error('Error checking other user:', otherUserError);
    }
    
    if (!otherUser) {
      console.log('Other user not found in users table');
      throw new Error('User not found. The user may have deleted their account.');
    }
    
    // Check if conversation exists
    const { data: existing, error: checkError } = await supabase
      .from('conversations')
      .select('id')
      .or(
        `and(participant_1.eq.${myId},participant_2.eq.${otherId}),and(participant_1.eq.${otherId},participant_2.eq.${myId})`
      )
      .maybeSingle();
      
    if (checkError) {
      console.error('Error checking existing conversation:', checkError);
      throw checkError;
    }
    
    if (existing) {
      console.log('Existing conversation found:', existing.id);
      return existing.id;
    }
    
    console.log('Creating new conversation...');
    
    // Create new conversation
    const { data: created, error } = await supabase
      .from('conversations')
      .insert({ participant_1: myId, participant_2: otherId })
      .select('id')
      .single();
      
    if (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
    
    console.log('New conversation created:', created.id);
    return created.id;
  },

  markAsRead: async (conversationId, userId) => {
    await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .eq('is_read', false);
  },
}));
