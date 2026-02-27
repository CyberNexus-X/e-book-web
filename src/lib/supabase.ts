import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          full_name: string;
          username: string;
          email: string;
          date_of_birth: string | null;
          gender: 'male' | 'female' | 'other' | null;
          avatar_url: string | null;
          is_online: boolean;
          last_seen: string;
          profile_public: boolean;
          username_changed_at: string | null;
          theme_config: ThemeConfig;
          created_at: string;
          bio?: string | null;
          bio_updated_at?: string | null;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at'> & { created_at?: string };
        Update: Partial<Database['public']['Tables']['users']['Row']>;
      };
    };
  };
};

export interface ThemeConfig {
  colorTheme: 'sky' | 'purple' | 'green' | 'orange' | 'pink' | 'red';
  mode: 'light' | 'dark';
  bubbleStyle: 'rounded' | 'square' | 'minimal';
  fontSize: 'small' | 'medium' | 'large';
  background: 'solid' | 'gradient' | 'pattern1' | 'pattern2';
}

export interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  avatar_url: string | null;
  is_online: boolean;
  last_seen: string;
  profile_public: boolean;
  username_changed_at: string | null;
  theme_config: ThemeConfig;
  created_at: string;
  // Ban fields
  is_banned?: boolean;
  banned_at?: string | null;
  banned_reason?: string | null;
  banned_by?: string | null;
  // Profile fields
  bio?: string | null;
  bio_updated_at?: string | null;
}

export interface Conversation {
  id: string;
  participant_1: string;
  participant_2: string;
  last_message: string | null;
  last_message_at: string;
  created_at: string;
  other_user?: User;
  unread_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  type: 'text' | 'image';
  content: string;
  is_read: boolean;
  created_at: string;
  // Auto-delete fields
  auto_delete_enabled?: boolean;
  auto_delete_duration?: string | null;
  auto_delete_at?: string | null;
}

export interface Status {
  id: string;
  user_id: string;
  content: string;
  visibility: 'contacts' | 'anyone';
  expires_at: string;
  created_at: string;
  user?: User;
  // Enhanced status fields
  background_color?: string;
  text_color?: string;
  font_size?: string;
  font_style?: string;
  font_family?: string;
  gradient?: string | null;
  emoji_overlay?: string | null;
  duration_hours?: number;
  is_deleted?: boolean;
}

export interface RandomChatSession {
  id: string;
  user1_id: string;
  user2_id: string | null;
  status: 'waiting' | 'connected' | 'ended';
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
}

export interface RandomChatMessage {
  id: string;
  session_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

// Admin Message System Types
export type MessageType = 'text' | 'announcement' | 'warning' | 'update';
export type AdminMessageStatus = 'draft' | 'scheduled' | 'sent';

export interface AdminMessage {
  id: string;
  sender_type: string;
  message_type: MessageType;
  title: string | null;
  content: string;
  is_broadcast: boolean;
  scheduled_at: string | null;
  sent_at: string | null;
  status: AdminMessageStatus;
  created_at: string;
}

export interface AdminMessageRecipient {
  id: string;
  message_id: string;
  user_id: string;
  is_delivered: boolean;
  is_read: boolean;
  read_at: string | null;
  delivered_at: string | null;
  created_at: string;
}

export interface AdminMessageTemplate {
  id: string;
  title: string;
  content: string;
  message_type: MessageType;
  created_at: string;
  updated_at: string;
}

export interface UserAdminMessage extends AdminMessage {
  is_delivered: boolean;
  is_read: boolean;
  read_at: string | null;
  delivered_at: string | null;
}

export interface MessageAnalytics {
  total_recipients: number;
  delivered_count: number;
  read_count: number;
  sent_count: number;
}

// Post Types
export type PostVisibility = 'contacts' | 'anyone';
export type DurationType = '7days' | '14days' | '30days' | 'permanent';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
export type FontStyle = 'normal' | 'italic' | 'bold';
export type FontFamily = 'default' | 'serif' | 'monospace' | 'handwriting';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  background_color?: string;
  text_color?: string;
  font_size?: string;
  font_style?: string;
  font_family?: string;
  gradient?: string | null;
  emoji_overlay?: string | null;
  visibility: PostVisibility;
  duration_type: DurationType;
  expires_at: string | null;
  is_deleted: boolean;
  created_at: string;
  user?: User;
  // Engagement counts (populated by queries)
  view_count?: number;
  reaction_count?: number;
  reply_count?: number;
  user_reaction?: string | null;
}

export interface PostView {
  id: string;
  post_id: string;
  viewer_id: string;
  viewed_at: string;
}

export interface PostReaction {
  id: string;
  post_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export interface PostReply {
  id: string;
  post_id: string;
  sender_id: string;
  message: string;
  created_at: string;
  sender?: User;
}

// Chat Settings Types
export interface ChatSettings {
  id: string;
  conversation_id: string;
  user_id: string;
  auto_delete_enabled: boolean;
  auto_delete_duration: string | null;
  disappearing_mode: boolean;
  created_at: string;
  updated_at: string;
}

// Status Engagement Types
export interface StatusView {
  id: string;
  status_id: string;
  viewer_id: string;
  viewed_at: string;
}

export interface StatusReaction {
  id: string;
  status_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export interface StatusReply {
  id: string;
  status_id: string;
  sender_id: string;
  message: string;
  created_at: string;
  sender?: User;
}

// Engagement Stats
export interface EngagementStats {
  view_count: number;
  reaction_count: number;
  reply_count: number;
}
