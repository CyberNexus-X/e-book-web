import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

export function usePresence() {
  const { user, updatePresence } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    // Mark online and set last_seen when user opens app
    const setOnline = async () => {
      await supabase.from('users').update({ 
        is_online: true, 
        last_seen: new Date().toISOString() 
      }).eq('id', user.id);
    };
    
    setOnline();

    // Subscribe to realtime updates for online status
    const channel = supabase
      .channel('presence')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'users',
        filter: `id=eq.${user.id}`
      }, (payload) => {
        // User was updated externally
        console.log('User presence updated:', payload);
      })
      .subscribe();

    // Handle tab visibility changes
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        // User left the tab - set offline
        await supabase.from('users').update({ 
          is_online: false, 
          last_seen: new Date().toISOString() 
        }).eq('id', user.id);
      } else if (document.visibilityState === 'visible') {
        // User came back to the tab - set online
        await supabase.from('users').update({ 
          is_online: true, 
          last_seen: new Date().toISOString() 
        }).eq('id', user.id);
      }
    };

    // Handle beforeunload when user closes browser/tab
    const handleBeforeUnload = async () => {
      await supabase.from('users').update({ 
        is_online: false, 
        last_seen: new Date().toISOString() 
      }).eq('id', user.id);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Set offline when component unmounts (user logs out or navigates away)
      supabase.from('users').update({ 
        is_online: false, 
        last_seen: new Date().toISOString() 
      }).eq('id', user.id);
      
      supabase.removeChannel(channel);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user?.id]);
}
