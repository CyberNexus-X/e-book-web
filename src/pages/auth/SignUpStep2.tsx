import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { validateUsername, generateUsernameSuggestions } from '../../lib/utils';
import { useAuthStore } from '../../store/useAuthStore';

export const SignUpStep2: React.FC = () => {
  const navigate = useNavigate();
  const { fetchProfile } = useAuthStore();
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'taken' | 'available'>('idle');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const signupData = JSON.parse(sessionStorage.getItem('signup_data') || 'null');
  const oauthData = JSON.parse(sessionStorage.getItem('oauth_signup') || 'null');

  useEffect(() => {
    if (!signupData && !oauthData) { navigate('/signup'); }
  }, []);

  const checkUsername = (val: string) => {
    setUsername(val);
    const validErr = validateUsername(val);
    if (validErr) { setStatus('idle'); setError(validErr); setSuggestions([]); return; }
    setError('');
    setStatus('checking');
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      const { data } = await supabase.from('users').select('id').eq('username', val).maybeSingle();
      if (data) {
        setStatus('taken');
        setSuggestions(generateUsernameSuggestions(val));
      } else {
        setStatus('available');
        setSuggestions([]);
      }
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'available') return;
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate('/signup'); return; }

    const { error: insertError } = await supabase.from('users').insert({
      id: user.id,
      full_name: signupData?.full_name || oauthData?.full_name || '',
      username,
      email: signupData?.email || oauthData?.email || '',
      date_of_birth: signupData?.date_of_birth || null,
      gender: signupData?.gender || null,
      is_online: true,
      profile_public: true,
      theme_config: { colorTheme: 'sky', mode: 'light', bubbleStyle: 'rounded', fontSize: 'medium', background: 'solid' },
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    sessionStorage.removeItem('signup_data');
    sessionStorage.removeItem('oauth_signup');
    await fetchProfile(user.id);
    navigate('/home');
    setLoading(false);
  };

  const statusColor = { idle: 'rgba(255,255,255,0.5)', checking: '#f59e0b', taken: '#ef4444', available: '#22c55e' }[status];
  const statusText = { idle: '', checking: '⏳ Checking…', taken: '❌ Username taken', available: '✅ Available!' }[status];

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ animation: 'fade-in 0.3s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ 
            width: 64, height: 64, borderRadius: 18, 
            background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: 32, margin: '0 auto 14px',
            boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)'
          }}>🎭</div>
          <h1 style={{ fontWeight: 800, fontSize: 24, color: 'white' }}>Choose Username</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>Step 2 of 2 — Pick a unique handle</p>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 13, color: 'white' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>@</span>
              <input
                className="glass-input"
                value={username}
                onChange={(e) => checkUsername(e.target.value.toLowerCase())}
                placeholder="your_username"
                maxLength={20}
                style={{ paddingLeft: 36 }}
                required
              />
            </div>
            {status !== 'idle' && (
              <p style={{ fontSize: 13, color: statusColor, marginTop: 6 }}>{statusText}</p>
            )}
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>3–20 chars, lowercase letters, numbers, underscore only.</p>
          </div>

          {suggestions.length > 0 && (
            <div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Try these:</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="glass-btn"
                    style={{ fontSize: 12, padding: '6px 12px' }}
                    onClick={() => checkUsername(s)}
                  >
                    @{s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="glass-btn-primary" 
            disabled={loading || status !== 'available'} 
            style={{ marginTop: 12 }}
          >
            {loading ? '⏳ Finishing up…' : '🚀 Get Started!'}
          </button>
        </form>
      </div>
    </div>
  );
};
