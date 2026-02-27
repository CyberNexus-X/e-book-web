import { useState, useEffect, useCallback } from 'react';
import { supabase, type RandomChatSession, type RandomChatMessage } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

export type RandomChatState = 'idle' | 'waiting' | 'connected' | 'ended';

export function useRandomChat() {
  const { user } = useAuthStore();
  const [state, setState] = useState<RandomChatState>('idle');
  const [session, setSession] = useState<RandomChatSession | null>(null);
  const [messages, setMessages] = useState<RandomChatMessage[]>([]);
  const [partnerUsername, setPartnerUsername] = useState<string>('');

  const findMatch = useCallback(async () => {
    if (!user) return;
    setState('waiting');
    setMessages([]);

    // Call the edge function
    const { data: { session: authSession } } = await supabase.auth.getSession();
    const token = authSession?.access_token;

    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/match-random-chat`,
      { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
    const { session: newSession } = await res.json();
    setSession(newSession);
    if (newSession.status === 'connected') {
      setState('connected');
      loadPartnerInfo(newSession);
    }
  }, [user]);

  const loadPartnerInfo = async (s: RandomChatSession) => {
    const partnerId = s.user1_id === user?.id ? s.user2_id : s.user1_id;
    if (!partnerId) return;
    const { data } = await supabase.from('users').select('username').eq('id', partnerId).single();
    if (data) setPartnerUsername(data.username);
  };

  const disconnect = useCallback(async () => {
    if (!session) return;
    await supabase
      .from('random_chat_sessions')
      .update({ status: 'ended', ended_at: new Date().toISOString() })
      .eq('id', session.id);
    setState('ended');
  }, [session]);

  const sendMessage = useCallback(async (content: string) => {
    if (!session || !user) return;
    await supabase.from('random_chat_messages').insert({
      session_id: session.id,
      sender_id: user.id,
      content,
    });
  }, [session, user]);

  // Subscribe to session updates (waiting → connected) and messages
  useEffect(() => {
    if (!session) return;

    const sessionChannel = supabase
      .channel(`rcs:${session.id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'random_chat_sessions',
        filter: `id=eq.${session.id}`,
      }, (payload) => {
        const updated = payload.new as RandomChatSession;
        setSession(updated);
        if (updated.status === 'connected') {
          setState('connected');
          loadPartnerInfo(updated);
        } else if (updated.status === 'ended') {
          setState('ended');
        }
      })
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'random_chat_messages',
        filter: `session_id=eq.${session.id}`,
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as RandomChatMessage]);
      })
      .subscribe();

    return () => { supabase.removeChannel(sessionChannel); };
  }, [session?.id]);

  const reset = useCallback(() => {
    setState('idle');
    setSession(null);
    setMessages([]);
    setPartnerUsername('');
  }, []);

  return { state, session, messages, partnerUsername, findMatch, disconnect, sendMessage, reset };
}
