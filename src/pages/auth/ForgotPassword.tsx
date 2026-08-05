import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        console.error('Password reset error:', resetError.message);
        setError(resetError.message);
      } else {
        console.log('Password reset email sent successfully');
        setSuccessMessage('Password reset link aapki email par bhej diya gaya hai. Check karein.');
        setEmail('');
      }
    } catch (err: any) {
      console.error('Password reset exception:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, background: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 12px',
          }}>🔐</div>
          <h1 style={{ fontWeight: 800, fontSize: 26, color: 'var(--color-text)' }}>Reset Password</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14, marginTop: 4 }}>
            Apna email enter karein. Hum aapko password reset link bhejenge.
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

        {!successMessage && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: 6, fontSize: 14 }}>Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? '⏳ Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div style={{ margin: '24px 0', textAlign: 'center' }}>
          <Link to="/signin" style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none', fontSize: 14 }}>
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
