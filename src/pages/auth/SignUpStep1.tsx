import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const getPasswordStrength = (p: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  const levels = [
    { label: 'Weak', color: '#ef4444' },
    { label: 'Fair', color: '#f59e0b' },
    { label: 'Good', color: '#10b981' },
    { label: 'Strong', color: '#0ea5e9' },
  ];
  return { score, ...levels[Math.max(0, score - 1)] };
};

export const SignUpStep1: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: '', email: '', date_of_birth: '', gender: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [registrationDisabled, setRegistrationDisabled] = useState(false);
  const strength = getPasswordStrength(form.password);

  // Check if registration is allowed
  useEffect(() => {
    const checkRegistration = async () => {
      const { data } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'allow_registration')
        .single();
      
      if (data && data.value === 'false') {
        setRegistrationDisabled(true);
      }
    };
    checkRegistration();
  }, []);

  const field = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { 
        data: { full_name: form.full_name },
      },
    });

    if (authError) {
      const errorMessage = authError.message;
      if (errorMessage.includes('rate limit') || errorMessage.includes('email rate limit')) {
        setError('Too many signup attempts. Please wait a few minutes and try again.');
      } else if (errorMessage.includes('User already registered') || errorMessage.includes('already been registered')) {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (errorMessage.includes('Invalid email')) {
        setError('Please enter a valid email address.');
      } else {
        setError(errorMessage);
      }
      setLoading(false); 
      return;
    }

    if (data.user) {
      sessionStorage.setItem('signup_data', JSON.stringify({
        uid: data.user.id,
        full_name: form.full_name,
        email: form.email,
        date_of_birth: form.date_of_birth,
        gender: form.gender,
      }));
      navigate('/signup/username');
    }
    setLoading(false);
  };

  // Show disabled message if registration is closed
  if (registrationDisabled) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ animation: 'fade-in 0.3s ease-out', textAlign: 'center' }}>
          <div style={{ 
            width: 64, height: 64, borderRadius: 18, 
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: 32, margin: '0 auto 14px',
            boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)'
          }}>🔒</div>
          <h1 style={{ fontWeight: 800, fontSize: 24, color: 'white', marginBottom: 12 }}>Registration Closed</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 24 }}>
            New account registration is currently disabled by the administrator.
          </p>
          <Link 
            to="/signin" 
            className="glass-btn-primary" 
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            Sign In Instead
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ animation: 'fade-in 0.3s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ 
            width: 64, height: 64, borderRadius: 18, 
            background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: 32, margin: '0 auto 14px',
            boxShadow: '0 8px 24px rgba(14, 165, 233, 0.4)'
          }}>💬</div>
          <h1 style={{ fontWeight: 800, fontSize: 24, color: 'white' }}>Create Account</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>Step 1 of 2 — Your Details</p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.2)', 
            color: '#ef4444', 
            borderRadius: 12, 
            padding: '14px 18px', 
            marginBottom: 16, 
            fontSize: 14,
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            {error}
          </div>
        )}

        {/* Google Sign Up Button */}
        <button
          type="button"
          onClick={async () => {
            setError('');
            setGoogleLoading(true);
            try {
              const { data, error: authError } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  redirectTo: `${window.location.origin}/auth/callback`,
                },
              });
              if (authError) {
                setError(authError.message);
              }
            } catch (err: any) {
              setError(err.message || 'An unexpected error occurred');
            } finally {
              setGoogleLoading(false);
            }
          }}
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
            marginBottom: 20,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2C17.64 8.56 17.58 7.96 17.45 7.38H9V10.67H13.86C13.69 11.78 13.17 12.75 12.31 13.47V15.83H15.31C17.24 14.17 17.64 11.87 17.64 9.2Z" fill="#4285F4"/>
            <path d="M9 18C11.43 18 13.47 17.19 15.31 15.83L12.31 13.47C11.52 14.01 10.34 14.46 9 14.46C6.66 14.46 4.69 12.83 4.03 10.67H1.03V13.09C2.5 15.82 5.44 18 9 18Z" fill="#34A853"/>
            <path d="M4.03 10.67C3.89 10.25 3.82 9.79 3.82 9.3C3.82 8.81 3.89 8.35 4.03 7.93V5.51H1.03C0.45 6.87 0.12 8.39 0.12 9.3C0.12 10.21 0.45 11.73 1.03 13.09L4.03 10.67Z" fill="#FBBC05"/>
            <path d="M9 3.54C10.15 3.54 11.2 3.94 12.02 4.77L15.23 1.56C13.46 -0.12 11.43 -0.5 9 -0.5C5.44 -0.5 2.5 1.68 1.03 4.41L4.03 7.09C4.69 4.93 6.66 3.54 9 3.54Z" fill="#EA4335"/>
          </svg>
          {googleLoading ? '⏳ Connecting...' : 'Sign up with Google'}
        </button>

        <div className="divider" style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.5)' }}>or</div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { key: 'full_name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
            { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { key: 'date_of_birth', label: 'Date of Birth', type: 'date', placeholder: '' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: 6, fontSize: 13, color: 'white' }}>{label}</label>
              <input 
                type={type} 
                className="glass-input" 
                placeholder={placeholder} 
                value={form[key as keyof typeof form]} 
                onChange={field(key as any)} 
                required 
              />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 6, fontSize: 13, color: 'white' }}>Gender</label>
            <select 
              className="glass-input" 
              value={form.gender} 
              onChange={field('gender')} 
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 6, fontSize: 13, color: 'white' }}>Password</label>
            <input 
              type="password" 
              className="glass-input" 
              placeholder="Min 8 characters" 
              value={form.password} 
              onChange={field('password')} 
              required 
            />
            {form.password && (
              <div style={{ marginTop: 8 }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 4, height: 4, overflow: 'hidden' }}>
                  <div 
                    className="strength-bar" 
                    style={{ 
                      width: `${(strength.score / 4) * 100}%`, 
                      background: strength.color,
                      height: '100%',
                      transition: 'all 0.3s'
                    }} 
                  />
                </div>
                <p style={{ fontSize: 11, color: strength.color, marginTop: 4 }}>{strength.label}</p>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 6, fontSize: 13, color: 'white' }}>Confirm Password</label>
            <input 
              type="password" 
              className="glass-input" 
              placeholder="Repeat password" 
              value={form.confirm} 
              onChange={field('confirm')} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="glass-btn-primary" 
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? '⏳ Creating account…' : 'Continue →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 20 }}>
          Already have an account?{' '}
          <Link to="/signin" style={{ color: '#38BDF8', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};
