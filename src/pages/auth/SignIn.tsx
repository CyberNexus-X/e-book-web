import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Already logged in, fetch profile and redirect
        const { fetchProfile } = useAuthStore.getState();
        await fetchProfile(session.user.id);
        navigate('/home');
      }
    };
    checkSession();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting sign in with email:', email);
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      
      if (authError) {
        console.error('Sign in auth error:', authError.message);
        setError(authError.message);
      } else if (data.user) {
        console.log('Sign in successful, user:', data.user.id);
        console.log('Session:', data.session);
        
        // Check if email is confirmed
        if (!data.user.email_confirmed_at) {
          setError('Email confirm ho gaya hai. Check your email for confirmation link.');
          setLoading(false);
          return;
        }
        
        // Fetch user profile from users table
        const { fetchProfile } = useAuthStore.getState();
        await fetchProfile(data.user.id);
        console.log('Profile fetched, navigating to /home');
        
        navigate('/home');
      } else {
        console.error('No user data returned');
        setError('Sign in failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Sign in exception:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      console.log('Initiating Google Sign In...');
      
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        console.error('Google Sign In error:', authError.message);
        setError(authError.message);
        setGoogleLoading(false);
      } else {
        console.log('Google Sign In initiated, redirecting...');
        // Supabase will handle the redirect
      }
    } catch (err: any) {
      console.error('Google Sign In exception:', err);
      setError(err.message || 'An unexpected error occurred');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ animation: 'fade-in 0.3s ease-out' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20, 
            background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(14, 165, 233, 0.4)'
          }}>💬</div>
          <h1 style={{ fontWeight: 800, fontSize: 28, color: 'white' }}>Voxra</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>Welcome back! Sign in to continue.</p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.2)', 
            color: '#ef4444', 
            borderRadius: 12, 
            padding: '14px 18px', 
            marginBottom: 16, 
            fontSize: 14,
            border: '1px solid rgba(239, 68, 68, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'white' }}>Email</label>
            <input
              type="email"
              className="glass-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading || googleLoading}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'white' }}>Password</label>
            <input
              type="password"
              className="glass-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={loading || googleLoading}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -8, marginBottom: 8 }}>
              <Link to="/forgot-password" style={{ color: '#38BDF8', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </div>
            <button 
              type="submit" 
              className="glass-btn-primary" 
              disabled={loading || googleLoading} 
              style={{ marginTop: 4, opacity: (loading || googleLoading) ? 0.7 : 1 }}
            >
            {loading ? '⏳ Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Google Sign In Button */}
        <div style={{ margin: '24px 0' }}>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 500,
              color: 'white',
              cursor: (loading || googleLoading) ? 'not-allowed' : 'pointer',
              opacity: (loading || googleLoading) ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2C17.64 8.56 17.58 7.96 17.45 7.38H9V10.67H13.86C13.69 11.78 13.17 12.75 12.31 13.47V15.83H15.31C17.24 14.17 17.64 11.87 17.64 9.2Z" fill="#4285F4"/>
              <path d="M9 18C11.43 18 13.47 17.19 15.31 15.83L12.31 13.47C11.52 14.01 10.34 14.46 9 14.46C6.66 14.46 4.69 12.83 4.03 10.67H1.03V13.09C2.5 15.82 5.44 18 9 18Z" fill="#34A853"/>
              <path d="M4.03 10.67C3.89 10.25 3.82 9.79 3.82 9.3C3.82 8.81 3.89 8.35 4.03 7.93V5.51H1.03C0.45 6.87 0.12 8.39 0.12 9.3C0.12 10.21 0.45 11.73 1.03 13.09L4.03 10.67Z" fill="#FBBC05"/>
              <path d="M9 3.54C10.15 3.54 11.2 3.94 12.02 4.77L15.23 1.56C13.46 -0.12 11.43 -0.5 9 -0.5C5.44 -0.5 2.5 1.68 1.03 4.41L4.03 7.09C4.69 4.93 6.66 3.54 9 3.54Z" fill="#EA4335"/>
            </svg>
            {googleLoading ? '⏳ Connecting...' : 'Sign in with Google'}
          </button>
        </div>

        <div className="divider" style={{ margin: '24px 0', color: 'rgba(255,255,255,0.5)' }}>or</div>
        
        <p style={{ textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#38BDF8', fontWeight: 600, textDecoration: 'none' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
