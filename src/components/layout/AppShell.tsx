import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNavBar } from './BottomNavBar';
import { useAuthStore } from '../../store/useAuthStore';
import { usePresence } from '../../hooks/usePresence';
import { usePushNotifications } from '../../hooks/usePushNotifications';
import { supabase } from '../../lib/supabase';
import { FullPageLoader } from '../common/Loader';

export const AppShell: React.FC = () => {
  const { user, loading, setUser, setLoading, fetchProfile, isBanned, initializeBanListener } = useAuthStore();
  const navigate = useNavigate();

  usePresence();
  
  // Initialize push notifications (pass null since we're not in a specific chat)
  usePushNotifications(null);

  useEffect(() => {
    // Check session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setUser(null);
        setLoading(false);
        navigate('/signin');
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        navigate('/signin');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Initialize ban listener when user is loaded
  useEffect(() => {
    if (user && !isBanned) {
      const cleanup = initializeBanListener();
      return cleanup;
    }
  }, [user?.id, isBanned]);

  if (loading) return <FullPageLoader />;
  if (!user) return <Navigate to="/signin" replace />;
  
  // Redirect banned users
  if (isBanned) {
    return <Navigate to="/banned" replace />;
  }

  return (
    <div className="app-shell glass-background">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
};
