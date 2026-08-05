import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { supabase } from '../../lib/supabase';

export const PrivacySettings: React.FC = () => {
  const navigate = useNavigate();
  const { user, fetchProfile } = useAuthStore();
  const [profilePublic, setProfilePublic] = useState(user?.profile_public ?? true);
  const [lastSeen, setLastSeen] = useState<'everyone' | 'contacts' | 'nobody'>('everyone');
  const [readReceipts, setReadReceipts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from('users').update({ profile_public: profilePublic }).eq('id', user.id);
    await fetchProfile(user.id);
    setSuccess('Privacy settings saved!');
    setSaving(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="glass-background" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="top-bar" style={{ background: 'transparent', borderBottom: 'none', padding: '12px 16px' }}>
        <button 
          onClick={() => navigate('/settings')} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }}
        >
          ←
        </button>
        <h3 style={{ fontWeight: 700, fontSize: 20, flex: 1, color: 'white', textAlign: 'center', marginRight: 40 }}>Privacy</h3>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px' }} className="smooth-scroll">
        {success && (
          <div style={{ 
            background: 'rgba(34, 197, 94, 0.2)', 
            backdropFilter: 'blur(10px)',
            color: '#22c55e', 
            borderRadius: 12, 
            padding: '14px 18px', 
            marginBottom: 16, 
            fontSize: 14,
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            {success}
          </div>
        )}

        {/* Profile Visibility */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Profile Visibility</p>
          
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <button
              onClick={() => setProfilePublic(true)}
              style={{
                flex: 1,
                padding: '20px 16px',
                borderRadius: 16,
                cursor: 'pointer',
                border: `2px solid ${profilePublic ? 'white' : 'rgba(255,255,255,0.15)'}`,
                background: profilePublic ? 'rgba(14, 165, 233, 0.25)' : 'rgba(255,255,255,0.05)',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>🌐</span>
              <p style={{ fontWeight: 700, fontSize: 16, color: 'white' }}>Public</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Avatar, name, username, bio visible to all</p>
            </button>
            <button
              onClick={() => setProfilePublic(false)}
              style={{
                flex: 1,
                padding: '20px 16px',
                borderRadius: 16,
                cursor: 'pointer',
                border: `2px solid ${!profilePublic ? 'white' : 'rgba(255,255,255,0.15)'}`,
                background: !profilePublic ? 'rgba(14, 165, 233, 0.25)' : 'rgba(255,255,255,0.05)',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>🔒</span>
              <p style={{ fontWeight: 700, fontSize: 16, color: 'white' }}>Private</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Only avatar & name shown</p>
            </button>
          </div>
          
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            ℹ️ Anyone can still start a chat with you regardless of privacy setting.
          </p>
        </div>

        {/* Last Seen */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Last Seen</p>
          
          <div className="segmented-control">
            {(['everyone', 'contacts', 'nobody'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setLastSeen(option)}
                className={`segmented-control-option ${lastSeen === option ? 'active' : ''}`}
                style={{ color: lastSeen === option ? 'white' : 'rgba(255,255,255,0.7)' }}
              >
                {option === 'everyone' ? '🌐 Everyone' : option === 'contacts' ? '👥 Contacts' : '🚫 Nobody'}
              </button>
            ))}
          </div>
        </div>

        {/* Read Receipts Toggle */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Read Receipts</p>
          
          <div className="settings-row" style={{ cursor: 'default' }}>
            <div className="settings-row-icon" style={{ background: 'rgba(14, 165, 233, 0.2)' }}>
              ✓
            </div>
            <div className="settings-row-content">
              <p className="settings-row-title" style={{ color: 'white' }}>Send Read Receipts</p>
              <p className="settings-row-subtitle">Let others know you've read their messages</p>
            </div>
            <div 
              className={`glass-toggle ${readReceipts ? 'active' : ''}`}
              onClick={() => setReadReceipts(!readReceipts)}
            >
              <div className="glass-toggle-thumb" />
            </div>
          </div>
        </div>

        {/* Online Status */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Online Status</p>
          
          <div className="settings-row" style={{ cursor: 'default' }}>
            <div className="settings-row-icon" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
              🟢
            </div>
            <div className="settings-row-content">
              <p className="settings-row-title" style={{ color: 'white' }}>Show Online Status</p>
              <p className="settings-row-subtitle">Let others see when you're online</p>
            </div>
            <div 
              className={`glass-toggle active`}
            >
              <div className="glass-toggle-thumb" />
            </div>
          </div>
        </div>

        <button className="glass-btn-primary" onClick={handleSave} disabled={saving} style={{ width: '100%' }}>
          {saving ? '⏳ Saving…' : '💾 Save Privacy Settings'}
        </button>
      </div>
    </div>
  );
};
