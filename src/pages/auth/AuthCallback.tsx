import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Processing auth callback...');
        
        // Get the session from URL (Supabase puts it in the hash)
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error.message);
          setStatus('error');
          setMessage(error.message);
          return;
        }

        if (!session) {
          console.error('No session found in callback');
          setStatus('error');
          setMessage('Authentication failed. No session found.');
          return;
        }

        console.log('Session found:', session.user.id);
        console.log('User email:', session.user.email);
        console.log('App metadata:', session.user.app_metadata);

        // Check if this is a new user (no user record in our users table)
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('id, username, email, full_name')
          .eq('id', session.user.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          // PGRST116 = no rows returned (new user)
          console.error('Error fetching user:', fetchError);
          setStatus('error');
          setMessage('Error checking user profile.');
          return;
        }

        if (!existingUser) {
          // New user - need to complete profile
          console.log('New user - redirecting to signup step 2');
          
          // Store OAuth data for profile completion
          const provider = session.user.app_metadata?.provider || 'google';
          const fullName = session.user.user_metadata?.full_name || 
                         session.user.user_metadata?.name || '';
          
          sessionStorage.setItem('oauth_signup', JSON.stringify({
            uid: session.user.id,
            email: session.user.email,
            full_name: fullName,
            provider: provider,
          }));
          
          setStatus('success');
          setMessage('Setting up your profile...');
          navigate('/signup/username');
        } else {
          // Existing user - fetch profile and redirect to home
          console.log('Existing user - redirecting to home');
          
          const { fetchProfile } = useAuthStore.getState();
          await fetchProfile(session.user.id);
          
          setStatus('success');
          setMessage('Welcome back! Redirecting...');
          navigate('/home');
        }
      } catch (err: any) {
        console.error('Auth callback exception:', err);
        setStatus('error');
        setMessage(err.message || 'An unexpected error occurred');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          {status === 'loading' && (
            <>
              <div style={{ fontSize: 48, marginBottom: 20 }}>⏳</div>
              <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Processing...</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>{message}</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
              <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Success!</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>{message}</p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div style={{ fontSize: 48, marginBottom: 20 }}>❌</div>
              <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12, color: '#dc2626' }}>Error</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 14, marginBottom: 20 }}>{message}</p>
              <a 
                href="/signin" 
                style={{ 
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Back to Sign In
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
