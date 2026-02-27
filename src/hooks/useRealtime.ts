import { useEffect } from 'react';
import { supabase, type Message } from '../lib/supabase';
import { useChatStore } from '../store/useChatStore';

export function useRealtime(conversationId: string | null) {
  const { addMessage } = useChatStore();

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          addMessage(payload.new as Message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, addMessage]);
}
