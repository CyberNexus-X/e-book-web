import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const notificationSettings = [
  { id: 'newMessages', title: 'New Messages', description: 'Get notified when you receive a new message', icon: '💬', defaultValue: true },
  { id: 'statusReplies', title: 'Status Replies', description: 'Get notified when someone replies to your status', icon: '📊', defaultValue: true },
  { id: 'reactions', title: 'Reactions', description: 'Get notified when someone reacts to your messages', icon: '❤️', defaultValue: true },
  { id: 'mentions', title: 'Mentions', description: 'Get notified when someone mentions you', icon: '@', defaultValue: true },
  { id: 'sound', title: 'Sound', description: 'Play sound for notifications', icon: '🔔', defaultValue: true },
  { id: 'vibration', title: 'Vibration', description: 'Vibrate for notifications', icon: '📳', defaultValue: true },
];

const sounds = [
  { id: 'default', label: 'Default', icon: '🔔' },
  { id: 'chime', label: 'Chime', icon: '🔔' },
  { id: 'bell', label: 'Bell', icon: '🔔' },
  { id: 'none', label: 'None', icon: '🔕' },
];

export const NotificationSettings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Record<string, boolean>>(
    notificationSettings.reduce((acc, s) => ({ ...acc, [s.id]: s.defaultValue }), {})
  );
  const [selectedSound, setSelectedSound] = useState('default');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  const toggleSetting = (id: string) => {
    setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess('Notification settings saved!');
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
        <h3 style={{ fontWeight: 700, fontSize: 20, flex: 1, color: 'white', textAlign: 'center', marginRight: 40 }}>Notifications</h3>
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

        {/* Notification Toggles */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Notification Types</p>
          
          {notificationSettings.filter(s => s.id !== 'sound').map((setting) => (
            <div key={setting.id} className="settings-row" style={{ cursor: 'default', marginBottom: 8 }}>
              <div className="settings-row-icon" style={{ background: 'rgba(14, 165, 233, 0.2)' }}>
                {setting.icon}
              </div>
              <div className="settings-row-content">
                <p className="settings-row-title" style={{ color: 'white' }}>{setting.title}</p>
                <p className="settings-row-subtitle">{setting.description}</p>
              </div>
              <div 
                className={`glass-toggle ${settings[setting.id] ? 'active' : ''}`}
                onClick={() => toggleSetting(setting.id)}
              >
                <div className="glass-toggle-thumb" />
              </div>
            </div>
          ))}
        </div>

        {/* Sound Selection */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>🔊 Notification Sound</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {sounds.map((sound) => (
              <button
                key={sound.id}
                onClick={() => setSelectedSound(sound.id)}
                style={{
                  padding: '14px',
                  borderRadius: 12,
                  border: selectedSound === sound.id ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                  background: selectedSound === sound.id ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8
                }}
              >
                {sound.icon} {sound.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vibration Toggle */}
        <div className="settings-row" style={{ cursor: 'default', marginBottom: 24 }}>
          <div className="settings-row-icon" style={{ background: 'rgba(236, 72, 153, 0.2)' }}>
            📳
          </div>
          <div className="settings-row-content">
            <p className="settings-row-title" style={{ color: 'white' }}>Vibration</p>
            <p className="settings-row-subtitle">Vibrate for notifications</p>
          </div>
          <div 
            className={`glass-toggle ${settings.vibration ? 'active' : ''}`}
            onClick={() => toggleSetting('vibration')}
          >
            <div className="glass-toggle-thumb" />
          </div>
        </div>

        <button className="glass-btn-primary" onClick={handleSave} disabled={saving} style={{ width: '100%' }}>
          {saving ? '⏳ Saving…' : '💾 Save Settings'}
        </button>
      </div>
    </div>
  );
};