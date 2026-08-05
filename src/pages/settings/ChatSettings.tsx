import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ChatSettings: React.FC = () => {
  const navigate = useNavigate();
  const [enterKey, setEnterKey] = useState<'send' | 'newline'>('send');
  const [mediaDownload, setMediaDownload] = useState<'wifi' | 'always' | 'never'>('wifi');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess('Chat settings saved!');
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
        <h3 style={{ fontWeight: 700, fontSize: 20, flex: 1, color: 'white', textAlign: 'center', marginRight: 40 }}>Chat Settings</h3>
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

        {/* Enter Key Action */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>⌨️ Enter Key Action</p>
          
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>
            Choose what the Enter key does when typing a message
          </p>
          
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setEnterKey('send')}
              style={{
                flex: 1,
                padding: '16px',
                borderRadius: 12,
                border: enterKey === 'send' ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                background: enterKey === 'send' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4
              }}
            >
              <span style={{ fontSize: 24 }}>📤</span>
              <span>Send Message</span>
            </button>
            <button
              onClick={() => setEnterKey('newline')}
              style={{
                flex: 1,
                padding: '16px',
                borderRadius: 12,
                border: enterKey === 'newline' ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                background: enterKey === 'newline' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4
              }}
            >
              <span style={{ fontSize: 24 }}>↩️</span>
              <span>New Line</span>
            </button>
          </div>
        </div>

        {/* Media Download */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>📥 Media Auto-Download</p>
          
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>
            Automatically download media (photos, videos) based on your connection
          </p>
          
          <div className="glass-card" style={{ padding: 4 }}>
            {[
              { value: 'wifi', label: 'WiFi Only', description: 'Download only on WiFi' },
              { value: 'always', label: 'Always', description: 'Download on any network' },
              { value: 'never', label: 'Never', description: 'Manual download only' },
            ].map((option, index) => (
              <label
                key={option.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  background: mediaDownload === option.value ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
                  borderBottom: index < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="radio"
                  name="mediaDownload"
                  value={option.value}
                  checked={mediaDownload === option.value}
                  onChange={(e) => setMediaDownload(e.target.value as any)}
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

        {/* Chat Preview */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Preview</p>
          
          <div className="live-preview" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <div className="bubble-glass-recv" style={{ maxWidth: '70%', alignSelf: 'flex-start' }}>
                  Hey! How are you doing?
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, justifyContent: 'flex-end' }}>
                <div className="bubble-glass-sent" style={{ maxWidth: '70%', alignSelf: 'flex-end' }}>
                  {enterKey === 'send' ? "I'm good, thanks! 😊" : "I'm good,\nthanks! 😊"}
                </div>
              </div>
            </div>
            <div style={{ 
              marginTop: 12, 
              padding: '10px 14px', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span style={{ fontSize: 18 }}>😊</span>
              <span style={{ flex: 1, color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Type a message...</span>
              <span style={{ 
                background: 'var(--primary)', 
                color: 'white', 
                padding: '6px 12px', 
                borderRadius: 16,
                fontSize: 12,
                fontWeight: 600
              }}>
                {enterKey === 'send' ? 'Send' : '↵'}
              </span>
            </div>
          </div>
        </div>

        <button className="glass-btn-primary" onClick={handleSave} disabled={saving} style={{ width: '100%' }}>
          {saving ? '⏳ Saving…' : '💾 Save Settings'}
        </button>
      </div>
    </div>
  );
};