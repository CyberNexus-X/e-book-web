import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Avatar } from '../../components/common/Avatar';

const settingsItems = [
  { to: '/settings/profile', icon: '🎨', label: 'Profile', desc: 'Photo, name, username', color: '#8b5cf6' },
  { to: '/settings/theme', icon: '🌈', label: 'Theme & UI', desc: 'Colors, dark mode, fonts', color: '#0ea5e9' },
  { to: '/settings/privacy', icon: '🔒', label: 'Privacy', desc: 'Profile visibility', color: '#10b981' },
  { to: '/settings/status-post', icon: '📊', label: 'Status & Posts', desc: 'Auto-delete, privacy', color: '#f59e0b' },
  { to: '/settings/notifications', icon: '🔔', label: 'Notifications', desc: 'Message alerts, sounds', color: '#ef4444' },
  { to: '/settings/account', icon: '🔑', label: 'Account', desc: 'Password, security', color: '#6366f1' },
  { to: '/settings/chat', icon: '💬', label: 'Chat Settings', desc: 'Enter key, media', color: '#ec4899' },
];

export const Settings: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="glass-background" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="top-bar" style={{ background: 'transparent', borderBottom: 'none', padding: '16px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>Settings</h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }} className="smooth-scroll">
        {/* Profile card */}
        {user && (
          <div 
            className="profile-card" 
            style={{ marginBottom: 24 }}
            onClick={() => navigate('/settings/profile')}
          >
            <div className="avatar-glow">
              <Avatar src={user.avatar_url} name={user.full_name} size={64} online={user.is_online} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 18, color: 'white' }}>{user.full_name}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>@{user.username}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 }}>{user.email}</p>
            </div>
            <span style={{ color: 'white', fontSize: 20, opacity: 0.7 }}>→</span>
          </div>
        )}

        {/* Settings Groups */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1, marginLeft: 4 }}>Preferences</p>
          
          {settingsItems.slice(0, 4).map((item) => (
            <div
              key={item.to}
              className="settings-row"
              onClick={() => navigate(item.to)}
            >
              <div className="settings-row-icon" style={{ background: `${item.color}20` }}>
                <span>{item.icon}</span>
              </div>
              <div className="settings-row-content">
                <p className="settings-row-title" style={{ color: 'white' }}>{item.label}</p>
                <p className="settings-row-subtitle">{item.desc}</p>
              </div>
              <span className="settings-row-arrow" style={{ color: 'rgba(255,255,255,0.5)' }}>→</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1, marginLeft: 4 }}>Account & Chat</p>
          
          {settingsItems.slice(4).map((item) => (
            <div
              key={item.to}
              className="settings-row"
              onClick={() => navigate(item.to)}
            >
              <div className="settings-row-icon" style={{ background: `${item.color}20` }}>
                <span>{item.icon}</span>
              </div>
              <div className="settings-row-content">
                <p className="settings-row-title" style={{ color: 'white' }}>{item.label}</p>
                <p className="settings-row-subtitle">{item.desc}</p>
              </div>
              <span className="settings-row-arrow" style={{ color: 'rgba(255,255,255,0.5)' }}>→</span>
            </div>
          ))}
        </div>

        {/* About Card */}
        <div className="glass-card" style={{ padding: 16, marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>About</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'rgba(255,255,255,0.8)' }}>
            <span>App Version</span>
            <span style={{ fontWeight: 600 }}>1.0.0</span>
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={async () => { await signOut(); navigate('/signin'); }}
          className="glass-btn-danger"
          style={{ width: '100%', marginBottom: 24 }}
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
};
