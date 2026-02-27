import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import type { ThemeConfig } from '../../lib/supabase';

const colors = [
  { label: 'Sky Blue', value: 'sky', color: '#0ea5e9' },
  { label: 'Purple', value: 'purple', color: '#8b5cf6' },
  { label: 'Green', value: 'green', color: '#10b981' },
  { label: 'Orange', value: 'orange', color: '#f59e0b' },
  { label: 'Pink', value: 'pink', color: '#ec4899' },
  { label: 'Red', value: 'red', color: '#ef4444' },
  { label: 'Midnight', value: 'midnight', color: '#1e293b' },
  { label: 'Amber', value: 'amber', color: '#d97706' },
];

const bubbleStyles = [
  { value: 'rounded', label: 'Rounded', icon: '⬭' },
  { value: 'square', label: 'Square', icon: '◻' },
  { value: 'minimal', label: 'Minimal', icon: '▫' },
];

const fontSizes = [
  { value: 'small', label: 'Small', size: '12px' },
  { value: 'medium', label: 'Medium', size: '15px' },
  { value: 'large', label: 'Large', size: '18px' },
];

const backgrounds = [
  { value: 'solid', label: 'Solid', icon: '🎨' },
  { value: 'gradient', label: 'Gradient', icon: '🌈' },
  { value: 'pattern1', label: 'Pattern 1', icon: '🔵' },
  { value: 'pattern2', label: 'Pattern 2', icon: '🟣' },
];

export const ThemeSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { config, setConfig, saveTheme, resetTheme } = useThemeStore();

  const update = (partial: Partial<ThemeConfig>) => {
    const newConfig = { ...config, ...partial } as ThemeConfig;
    setConfig(newConfig);
  };

  const handleSave = () => { if (user) saveTheme(user.id, config); };
  const handleReset = () => { if (user) resetTheme(user.id); };

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
        <h3 style={{ fontWeight: 700, fontSize: 20, flex: 1, color: 'white', textAlign: 'center', marginRight: 40 }}>Theme & UI</h3>
        <button 
          onClick={handleReset} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500, padding: '8px 12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)' }}
        >
          Reset
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px' }} className="smooth-scroll">
        
        {/* Live Preview */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Live Preview</p>
          <div className="live-preview" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="bubble-glass-recv" style={{ maxWidth: '70%', alignSelf: 'flex-start' }}>
                Hey! How are you? 👋
              </div>
              <div className="bubble-glass-sent" style={{ maxWidth: '70%', alignSelf: 'flex-end' }}>
                I'm doing great! Thanks 😊
              </div>
            </div>
          </div>
        </div>

        {/* Color Theme */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Color Theme</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {colors.map((c) => (
              <button 
                key={c.value} 
                onClick={() => update({ colorTheme: c.value as any })} 
                style={{
                  aspectRatio: '1',
                  borderRadius: '50%',
                  background: c.color,
                  border: config.colorTheme === c.value ? '3px solid white' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: config.colorTheme === c.value ? `0 0 16px ${c.color}` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={c.label}
              >
                {config.colorTheme === c.value && <span style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>✓</span>}
              </button>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            {colors.find(c => c.value === config.colorTheme)?.label}
          </p>
        </div>

        {/* Dark/Light Mode */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Mode</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => update({ mode: 'light' })} 
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 12,
                border: config.mode === 'light' ? '2px solid white' : '2px solid rgba(255,255,255,0.2)',
                background: config.mode === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              ☀️ Light
            </button>
            <button 
              onClick={() => update({ mode: 'dark' })} 
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 12,
                border: config.mode === 'dark' ? '2px solid white' : '2px solid rgba(255,255,255,0.2)',
                background: config.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              🌙 Dark
            </button>
          </div>
        </div>

        {/* Bubble Style */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Chat Bubble Style</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {bubbleStyles.map((b) => (
              <button 
                key={b.value}
                onClick={() => update({ bubbleStyle: b.value as any })}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 12,
                  border: config.bubbleStyle === b.value ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                  background: config.bubbleStyle === b.value ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: 14
                }}
              >
                {b.icon} {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Font Size</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {fontSizes.map((f) => (
              <button 
                key={f.value}
                onClick={() => update({ fontSize: f.value as any })}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 12,
                  border: config.fontSize === f.value ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                  background: config.fontSize === f.value ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: f.size
                }}
              >
                Aa
              </button>
            ))}
          </div>
        </div>

        {/* Background */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Background</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {backgrounds.map((b) => (
              <button 
                key={b.value}
                onClick={() => update({ background: b.value as any })}
                style={{
                  padding: '12px 8px',
                  borderRadius: 12,
                  border: config.background === b.value ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.1)',
                  background: config.background === b.value ? 'rgba(14, 165, 233, 0.2)' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: 12
                }}
              >
                {b.icon} {b.label}
              </button>
            ))}
          </div>
        </div>

        <button className="glass-btn-primary" onClick={handleSave} style={{ width: '100%' }}>
          💾 Save Theme
        </button>
      </div>
    </div>
  );
};
