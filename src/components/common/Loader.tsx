import React from 'react';

export const Loader: React.FC<{ size?: number; color?: string }> = ({ size = 24, color }) => (
  <svg
    className="loader"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || 'var(--color-primary)'}
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

export const FullPageLoader: React.FC = () => (
  <div style={{
    position: 'fixed', inset: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--color-bg)',
    flexDirection: 'column', gap: 16
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: '50%',
      background: 'var(--color-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <span style={{ fontSize: 24 }}>💬</span>
    </div>
    <Loader size={32} />
    <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>Loading Voxra…</p>
  </div>
);
