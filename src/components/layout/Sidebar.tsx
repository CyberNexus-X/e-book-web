import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Avatar } from '../common/Avatar';

const navItems = [
  { to: '/home', label: 'Home', icon: '💬' },
  { to: '/search', label: 'Search', icon: '🔍' },
  { to: '/status', label: 'Status', icon: '📊' },
  { to: '/posts', label: 'Posts', icon: '📝' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export const Sidebar: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '24px 20px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
        }}>
          💬
        </div>
        <span style={{ fontWeight: 700, fontSize: 20, color: 'var(--color-text)' }}>Voxra</span>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '8px 0' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      {user && (
        <div style={{
          padding: '16px',
          borderTop: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255, 255, 255, 0.03)',
          margin: '8px',
          borderRadius: '12px'
        }}>
          <div className="avatar-glow">
            <Avatar src={user.avatar_url} name={user.full_name} size={36} online={user.is_online} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.full_name}</p>
            <p style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>@{user.username}</p>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: 16, 
              color: 'var(--color-text-muted)', 
              padding: 8,
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            🚪
          </button>
        </div>
      )}
    </aside>
  );
};
