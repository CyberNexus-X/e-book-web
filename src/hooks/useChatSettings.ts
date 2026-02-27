import { useState, useEffect, useCallback } from 'react';
import { supabase, type ChatSettings } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

export const useChatSettings = (conversationId: string) => {
  const { user } = useAuthStore();
  const [settings, setSettings] = useState<ChatSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    if (!user || !conversationId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chat_settings')
        .select('*')
        .eq('conversation_id', conversationId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        throw error;
      }

      setSettings(data || null);
    } catch (err) {
      // Default settings if none exist
      setSettings(null);
    } finally {
      setLoading(false);
    }
  }, [conversationId, user]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateAutoDelete = useCallback(async (
    autoDeleteEnabled: boolean,
    duration?: string
  ) => {
    if (!user || !conversationId) return { error: 'Not authenticated' };

    try {
      const { error: upsertError } = await supabase
        .from('chat_settings')
        .upsert({
          conversation_id: conversationId,
          user_id: user.id,
          auto_delete_enabled: autoDeleteEnabled,
          auto_delete_duration: duration || '24',
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'conversation_id,user_id',
        });

      if (upsertError) throw upsertError;

      setSettings(prev => prev ? {
        ...prev,
        auto_delete_enabled: autoDeleteEnabled,
        auto_delete_duration: duration || '24',
      } : {
        id: '',
        conversation_id: conversationId,
        user_id: user.id,
        auto_delete_enabled: autoDeleteEnabled,
        auto_delete_duration: duration || '24',
        disappearing_mode: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, [conversationId, user]);

  const updateDisappearingMode = useCallback(async (
    enabled: boolean,
    duration?: string
  ) => {
    if (!user || !conversationId) return { error: 'Not authenticated' };

    try {
      const { error: upsertError } = await supabase
        .from('chat_settings')
        .upsert({
          conversation_id: conversationId,
          user_id: user.id,
          disappearing_mode: enabled,
          auto_delete_enabled: enabled,
          auto_delete_duration: duration || '24',
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'conversation_id,user_id',
        });

      if (upsertError) throw upsertError;

      setSettings(prev => prev ? {
        ...prev,
        disappearing_mode: enabled,
        auto_delete_enabled: enabled,
        auto_delete_duration: duration || '24',
      } : {
        id: '',
        conversation_id: conversationId,
        user_id: user.id,
        auto_delete_enabled: enabled,
        auto_delete_duration: duration || '24',
        disappearing_mode: enabled,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, [conversationId, user]);

  const enableMessageExpiry = useCallback(async (duration: string) => {
    return updateAutoDelete(true, duration);
  }, [updateAutoDelete]);

  const disableMessageExpiry = useCallback(async () => {
    return updateAutoDelete(false);
  }, [updateAutoDelete]);

  return {
    settings,
    loading,
    fetchSettings,
    updateAutoDelete,
    updateDisappearingMode,
    enableMessageExpiry,
    disableMessageExpiry,
  };
};

// Helper hook for individual message auto-delete
export const useMessageAutoDelete = () => {
  const { user } = useAuthStore();

  const setMessageAutoDelete = useCallback(async (
    messageId: string,
    enabled: boolean,
    duration?: string
  ) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      let autoDeleteAt: string | null = null;
      
      if (enabled && duration) {
        const hours = parseInt(duration.replace('h', '')) || 24;
        autoDeleteAt = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
      }

      const { error: updateError } = await supabase
        .from('messages')
        .update({
          auto_delete_enabled: enabled,
          auto_delete_duration: duration || null,
          auto_delete_at: autoDeleteAt,
        })
        .eq('id', messageId)
        .eq('sender_id', user.id); // Only sender can set auto-delete

      if (updateError) throw updateError;
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  }, [user]);

  const getAutoDeleteLabel = (duration?: string | null): string => {
    if (!duration) return '';
    const hours = parseInt(duration.replace('h', ''));
    if (hours === 1) return '1 hour';
    if (hours === 24) return '24 hours';
    if (hours === 168) return '1 week';
    return duration;
  };

  return {
    setMessageAutoDelete,
    getAutoDeleteLabel,
  };
};
