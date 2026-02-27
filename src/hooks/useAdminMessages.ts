import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { 
  AdminMessage, 
  AdminMessageRecipient, 
  AdminMessageTemplate, 
  UserAdminMessage,
  MessageAnalytics,
  MessageType,
  AdminMessageStatus
} from '../lib/supabase';

// Hook for fetching all admin messages (for admin panel)
export const useAdminMessages = () => {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('admin_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const createMessage = async (
    content: string,
    messageType: MessageType,
    title: string | null,
    isBroadcast: boolean,
    recipientIds?: string[],
    scheduledAt?: string
  ) => {
    const status: AdminMessageStatus = scheduledAt ? 'scheduled' : 'draft';
    
    const { data: message, error } = await supabase
      .from('admin_messages')
      .insert({
        sender_type: 'admin',
        message_type: messageType,
        title,
        content,
        is_broadcast: isBroadcast,
        scheduled_at: scheduledAt || null,
        status
      })
      .select()
      .single();

    if (error) throw error;

    // If not broadcast and recipient IDs provided, create recipients
    if (!isBroadcast && recipientIds && recipientIds.length > 0) {
      const recipients = recipientIds.map(userId => ({
        message_id: message.id,
        user_id: userId,
        is_delivered: false,
        is_read: false
      }));

      const { error: recipientError } = await supabase
        .from('admin_message_recipients')
        .insert(recipients);

      if (recipientError) throw recipientError;
    }

    return message;
  };

  const sendMessage = async (messageId: string, recipientIds?: string[]) => {
    // Get all users if broadcast
    let users = recipientIds;
    
    if (!users) {
      const { data: allUsers } = await supabase
        .from('users')
        .select('id');
      users = allUsers?.map(u => u.id) || [];
    }

    // Create recipients
    const recipients = users.map(userId => ({
      message_id: messageId,
      user_id: userId,
      is_delivered: true,
      is_read: false,
      delivered_at: new Date().toISOString()
    }));

    const { error: recipientError } = await supabase
      .from('admin_message_recipients')
      .insert(recipients);

    if (recipientError) throw recipientError;

    // Update message status
    const { error: updateError } = await supabase
      .from('admin_messages')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString()
      })
      .eq('id', messageId);

    if (updateError) throw updateError;
  };

  const scheduleMessage = async (messageId: string) => {
    const { error } = await supabase
      .from('admin_messages')
      .update({ status: 'scheduled' })
      .eq('id', messageId);

    if (error) throw error;
  };

  const deleteMessage = async (messageId: string) => {
    const { error } = await supabase
      .from('admin_messages')
      .delete()
      .eq('id', messageId);

    if (error) throw error;
  };

  const getMessageAnalytics = async (messageId: string): Promise<MessageAnalytics> => {
    const { data, error } = await supabase
      .rpc('get_message_analytics', { p_message_id: messageId });

    if (error) throw error;
    return data?.[0] || { total_recipients: 0, delivered_count: 0, read_count: 0, sent_count: 0 };
  };

  const getRecipients = async (messageId: string) => {
    const { data, error } = await supabase
      .from('admin_message_recipients')
      .select('*, user:users(id, full_name, username, avatar_url)')
      .eq('message_id', messageId);

    if (error) throw error;
    return data || [];
  };

  return {
    messages,
    loading,
    error,
    fetchMessages,
    createMessage,
    sendMessage,
    scheduleMessage,
    deleteMessage,
    getMessageAnalytics,
    getRecipients
  };
};

// Hook for fetching user admin messages
export const useUserAdminMessages = (userId: string | null) => {
  const [messages, setMessages] = useState<UserAdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMessages = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .rpc('get_user_admin_messages', { p_user_id: userId });

    if (error) {
      console.error('Error fetching admin messages:', error);
    } else {
      setMessages(data || []);
      const unread = (data || []).filter((m: UserAdminMessage) => !m.is_read).length;
      setUnreadCount(unread);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Subscribe to new admin messages
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('admin_messages_user')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_message_recipients',
          filter: `user_id=eq.${userId}`
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchMessages]);

  const markAsRead = async (messageId: string) => {
    const { error } = await supabase
      .from('admin_message_recipients')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('message_id', messageId)
      .eq('user_id', userId)
      .eq('is_read', false);

    if (!error) {
      setMessages(prev => 
        prev.map(m => 
          m.id === messageId 
            ? { ...m, is_read: true, read_at: new Date().toISOString() }
            : m
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  return {
    messages,
    loading,
    unreadCount,
    fetchMessages,
    markAsRead
  };
};

// Hook for admin message templates
export const useAdminMessageTemplates = () => {
  const [templates, setTemplates] = useState<AdminMessageTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('admin_message_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setTemplates(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const createTemplate = async (
    title: string,
    content: string,
    messageType: MessageType
  ) => {
    const { data, error } = await supabase
      .from('admin_message_templates')
      .insert({ title, content, message_type: messageType })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateTemplate = async (
    id: string,
    title: string,
    content: string,
    messageType: MessageType
  ) => {
    const { error } = await supabase
      .from('admin_message_templates')
      .update({ 
        title, 
        content, 
        message_type: messageType,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  };

  const deleteTemplate = async (id: string) => {
    const { error } = await supabase
      .from('admin_message_templates')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  return {
    templates,
    loading,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate
  };
};

// Hook for real-time message status updates (for admin)
export const useAdminMessageRealtime = (onUpdate?: () => void) => {
  useEffect(() => {
    const channel = supabase
      .channel('admin_recipients_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'admin_message_recipients'
        },
        () => {
          onUpdate?.();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onUpdate]);
};

// Hook for user-side real-time admin messages
export const useUserAdminMessageRealtime = (userId: string | null, onNewMessage?: () => void) => {
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('user_admin_messages_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_message_recipients',
          filter: `user_id=eq.${userId}`
        },
        () => {
          onNewMessage?.();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onNewMessage]);
};
