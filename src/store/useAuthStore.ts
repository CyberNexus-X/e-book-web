import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User } from '../lib/supabase';
import { applyTheme } from '../styles/themes';

interface AuthState {
  user: User | null;
  loading: boolean;
  isBanned: boolean;
  setUser: (user: User | null) => void;
  setLoading: (v: boolean) => void;
  signOut: () => Promise<void>;
  fetchProfile: (uid: string) => Promise<void>;
  updatePresence: (online: boolean) => Promise<void>;
  initializePresence: () => void;
  initializeBanListener: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      isBanned: false,
      setUser: (user) => {
        set({ user, isBanned: user?.is_banned || false });
        if (user?.theme_config) applyTheme(user.theme_config);
      },
      setLoading: (loading) => set({ loading }),
      signOut: async () => {
        const uid = get().user?.id;
        if (uid) {
          await supabase.from('users').update({ is_online: false, last_seen: new Date().toISOString() }).eq('id', uid);
        }
        await supabase.auth.signOut();
        set({ user: null, isBanned: false });
      },
      fetchProfile: async (uid: string) => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', uid)
          .single();
        if (!error && data) {
          const isBanned = data.is_banned || false;
          set({ user: data as User, isBanned });
          applyTheme((data as User).theme_config);
          // Set user as online when profile is fetched
          await supabase.from('users').update({ 
            is_online: true, 
            last_seen: new Date().toISOString() 
          }).eq('id', uid);
        }
      },
      updatePresence: async (online: boolean) => {
        const uid = get().user?.id;
        if (!uid) return;
        await supabase.from('users').update({
          is_online: online,
          last_seen: new Date().toISOString(),
        }).eq('id', uid);
      },
      // Initialize presence tracking - call this when app loads
      initializePresence: () => {
        const uid = get().user?.id;
        if (!uid) return;
        
        // Set online when user opens app
        supabase.from('users').update({ 
          is_online: true, 
          last_seen: new Date().toISOString() 
        }).eq('id', uid);
        
        // Set offline when user closes app or refreshes
        const handleBeforeUnload = () => {
          supabase.from('users').update({ 
            is_online: false, 
            last_seen: new Date().toISOString() 
          }).eq('id', uid);
        };
        
        // Listen for page unload
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        // Also handle visibility change (tab switch, minimize)
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'hidden') {
            supabase.from('users').update({ 
              is_online: false, 
              last_seen: new Date().toISOString() 
            }).eq('id', uid);
          } else if (document.visibilityState === 'visible') {
            supabase.from('users').update({ 
              is_online: true, 
              last_seen: new Date().toISOString() 
            }).eq('id', uid);
          }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_OUT') {
            await supabase.from('users').update({ 
              is_online: false, 
              last_seen: new Date().toISOString() 
            }).eq('id', uid);
          }
        });
        
        // Cleanup function will be returned
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          subscription.unsubscribe();
        };
      },
      // Initialize ban listener - detect if user gets banned while online
      initializeBanListener: () => {
        const uid = get().user?.id;
        if (!uid) return;

        const channel = supabase
          .channel('user_ban_status')
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'users',
              filter: `id=eq.${uid}`
            },
            (payload) => {
              const newIsBanned = payload.new.is_banned;
              if (newIsBanned && !get().isBanned) {
                // User just got banned
                set({ isBanned: true });
                // Show alert and redirect
                alert('Your account has been banned by the administrator.');
                get().signOut();
              }
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      },
    }),
    { name: 'auth-store', partialize: (s) => ({ user: s.user }) }
  )
);
