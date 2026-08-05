import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatSettings } from '../../hooks/useChatSettings';

const AUTO_DELETE_OPTIONS = [
  { value: 'off', label: 'Off', description: 'Messages are kept forever' },
  { value: '1h', label: '1 Hour', description: 'Delete after 1 hour' },
  { value: '6h', label: '6 Hours', description: 'Delete after 6 hours' },
  { value: '24h', label: '24 Hours', description: 'Delete after 1 day' },
  { value: '7d', label: '1 Week', description: 'Delete after 1 week' },
];

export const StatusPostSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const conversationId = 'demo-conversation';
  const { settings, enableMessageExpiry, disableMessageExpiry } = useChatSettings(conversationId);

  const [selectedDuration, setSelectedDuration] = useState('off');
  const [statusVisibility, setStatusVisibility] = useState<'anyone' | 'contacts'>('anyone');
  const [postVisibility, setPostVisibility] = useState<'public' | 'contacts'>('public');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setSuccess('');

    try {
      if (selectedDuration === 'off') {
        await disableMessageExpiry();
      } else {
        await enableMessageExpiry(selectedDuration);
      }
      setSuccess('Settings saved!');
    } catch (err) {
      console.error(err);
    }

    setSaving(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  if (!user) return null;

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
        <h3 style={{ fontWeight: 700, fontSize: 20, flex: 1, color: 'white', textAlign: 'center', marginRight: 40 }}>Status & Posts</h3>
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

        {/* Auto-Delete Messages */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>🗑️ Auto-Delete Messages</p>
          
          <div className="glass-card" style={{ padding: 4 }}>
            {AUTO_DELETE_OPTIONS.map(option => (
              <label
                key={option.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  background: selectedDuration === option.value ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
                  borderBottom: option.value !== AUTO_DELETE_OPTIONS[AUTO_DELETE_OPTIONS.length - 1].value ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="radio"
                  name="autoDelete"
                  value={option.value}
                  checked={selectedDuration === option.value}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  style={{ marginRight: 12, accentColor: '#0ea5e9' }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 15, color: 'white' }}>{option.label}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Disappearing Messages */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>✨ Disappearing Messages</p>
          
          <div className="settings-row" style={{ cursor: 'default' }}>
            <div className="settings-row-icon" style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
              ✨
            </div>
            <div className="settings-row-content">
              <p className="settings-row-title" style={{ color: 'white' }}>Enable Disappearing Messages</p>
              <p className="settings-row-subtitle">Messages auto-delete after being read</p>
            </div>
            <div 
              className={`glass-toggle ${settings?.disappearing_mode ? 'active' : ''}`}
              onClick={() => {
                if (settings?.disappearing_mode) {
                  setSelectedDuration('off');
                } else {
                  setSelectedDuration('24h');
                }
              }}
            >
              <div className="glass-toggle-thumb" />
            </div>
          </div>
        </div>

        {/* Status Privacy */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>👁️ Status Privacy</p>
          
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setStatusVisibility('anyone')}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 12,
                border: statusVisibility === 'anyone' ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                background: statusVisibility === 'anyone' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              🌐 Everyone
            </button>
            <button
              onClick={() => setStatusVisibility('contacts')}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 12,
                border: statusVisibility === 'contacts' ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                background: statusVisibility === 'contacts' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              👥 Contacts
            </button>
          </div>
        </div>

        {/* Post Privacy */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>📝 Post Privacy</p>
          
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setPostVisibility('public')}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 12,
                border: postVisibility === 'public' ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                background: postVisibility === 'public' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              🌐 Public
            </button>
            <button
              onClick={() => setPostVisibility('contacts')}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 12,
                border: postVisibility === 'contacts' ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                background: postVisibility === 'contacts' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              👥 Contacts
            </button>
          </div>
        </div>

        <button className="glass-btn-primary" onClick={handleSave} disabled={saving} style={{ width: '100%' }}>
          {saving ? '⏳ Saving...' : '💾 Save Settings'}
        </button>
      </div>
    </div>
  );
};
