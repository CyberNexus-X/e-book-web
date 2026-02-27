import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  // Password strength calculation
  const getPasswordStrength = (pwd: string): { level: number; label: string; color: string } => {
    if (!pwd) return { level: 0, label: '', color: '#e5e7eb' };
    
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++;

    if (score <= 1) return { level: 1, label: 'Weak', color: '#ef4444' };
    if (score <= 2) return { level: 2, label: 'Fair', color: '#f97316' };
    if (score <= 3) return { level: 3, label: 'Good', color: '#eab308' };
    if (score <= 4) return { level: 4, label: 'Strong', color: '#22c55e' };
    return { level: 5, label: 'Very Strong', color: '#16a34a' };
  };

  const strength = getPasswordStrength(password);

  // Check if user is already logged in - redirect to home
  // Also verify the reset token is valid
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Check if this is a password reset flow (has hash params)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      
      // If we have tokens in URL, set them to complete the flow
      if (accessToken && refreshToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        setIsValidToken(true);
      } else if (session) {
        // User is already logged in, redirect to home
        navigate('/home');
      } else {
        // No valid session and no tokens - invalid/expired link
        setIsValidToken(false);
      }
    };

    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords match nahi kar raha hai. Dubara try karein.');
      return;
    }

    if (password.length < 6) {
      setError('Password kam se kam 6 characters ka hona chahiye.');
      return;
    }

    setLoading(true);

    try {
      // Update the user's password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        console.error('Password update error:', updateError.message);
        setError(updateError.message);
      } else {
        console.log('Password updated successfully');
        setSuccessMessage('Password successfully reset ho gaya! Ab sign in karein.');
        
        // Sign out and redirect to signin after a short delay
        setTimeout(async () => {
          await supabase.auth.signOut();
          navigate('/signin');
        }, 2000);
      }
    } catch (err: any) {
      console.error('Password update exception:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Loading state while checking token
  if (isValidToken === null) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 24, marginBottom: 16 }}>⏳</div>
            <p style={{ color: 'var(--color-text-muted)' }}>Verifying link...</p>
          </div>
        </div>
      </div>
    );
  }

  // Invalid/expired link
  if (isValidToken === false) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 18, background: '#fee2e2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, margin: '0 auto 12px',
            }}>❌</div>
            <h1 style={{ fontWeight: 800, fontSize: 26, color: 'var(--color-text)' }}>Invalid Link</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 14, marginTop: 4 }}>
              Yeh reset link expired ho gaya hai ya invalid hai.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/forgot-password" style={{ 
              color: 'var(--color-primary)', 
              fontWeight: 600, 
              textDecoration: 'none',
              display: 'inline-block',
              padding: '12px 24px',
              background: 'var(--color-primary)',
              color: '#fff',
              borderRadius: 10,
            }}>
              Naya Reset Link Maangein
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, background: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 12px',
          }}>🔑</div>
          <h1 style={{ fontWeight: 800, fontSize: 26, color: 'var(--color-text)' }}>New Password</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14, marginTop: 4 }}>
            Apna naya password set karein.
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 14 }}>
            {error}
          </div>
        )}

        {successMessage && (
          <div style={{ background: '#dcfce7', color: '#16a34a', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 14 }}>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 6, fontSize: 14 }}>New Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            {/* Password Strength Indicator */}
            {password && (
              <div style={{ marginTop: 8 }}>
                <div style={{ 
                  height: 4, 
                  background: '#e5e7eb', 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  marginBottom: 4,
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(strength.level / 5) * 100}%`,
                    background: strength.color,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }} />
                </div>
                <span style={{ fontSize: 12, color: strength.color, fontWeight: 500 }}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>
          
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 6, fontSize: 14 }}>Confirm New Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            {confirmPassword && password === confirmPassword && (
              <span style={{ fontSize: 12, color: '#16a34a', marginTop: 4, display: 'block' }}>
                ✓ Passwords match
              </span>
            )}
            {confirmPassword && password !== confirmPassword && (
              <span style={{ fontSize: 12, color: '#ef4444', marginTop: 4, display: 'block' }}>
                ✗ Passwords match nahi kar raha
              </span>
            )}
          </div>

          <button type="submit" className="btn-primary" disabled={loading || !password || password !== confirmPassword} style={{ marginTop: 4 }}>
            {loading ? '⏳ Updating...' : 'Reset Password'}
          </button>
        </form>

        <div style={{ margin: '24px 0', textAlign: 'center' }}>
          <Link to="/signin" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none', fontSize: 14 }}>
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
