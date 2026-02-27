import type { ThemeConfig } from '../lib/supabase';

const COLOR_THEMES: Record<string, Record<string, string>> = {
  sky: {
    '--color-primary': '#0ea5e9',
    '--color-primary-dark': '#0284c7',
    '--color-primary-light': '#bae6fd',
    '--color-bubble-sent': '#0ea5e9',
    '--color-bubble-sent-text': '#ffffff',
  },
  purple: {
    '--color-primary': '#8b5cf6',
    '--color-primary-dark': '#7c3aed',
    '--color-primary-light': '#ddd6fe',
    '--color-bubble-sent': '#8b5cf6',
    '--color-bubble-sent-text': '#ffffff',
  },
  green: {
    '--color-primary': '#10b981',
    '--color-primary-dark': '#059669',
    '--color-primary-light': '#a7f3d0',
    '--color-bubble-sent': '#10b981',
    '--color-bubble-sent-text': '#ffffff',
  },
  orange: {
    '--color-primary': '#f59e0b',
    '--color-primary-dark': '#d97706',
    '--color-primary-light': '#fde68a',
    '--color-bubble-sent': '#f59e0b',
    '--color-bubble-sent-text': '#ffffff',
  },
  pink: {
    '--color-primary': '#ec4899',
    '--color-primary-dark': '#db2777',
    '--color-primary-light': '#fbcfe8',
    '--color-bubble-sent': '#ec4899',
    '--color-bubble-sent-text': '#ffffff',
  },
  red: {
    '--color-primary': '#ef4444',
    '--color-primary-dark': '#dc2626',
    '--color-primary-light': '#fecaca',
    '--color-bubble-sent': '#ef4444',
    '--color-bubble-sent-text': '#ffffff',
  },
};

const FONT_SIZES: Record<string, string> = {
  small: '13px',
  medium: '15px',
  large: '17px',
};

export function applyTheme(config: ThemeConfig): void {
  const root = document.documentElement;

  // Apply color theme
  const colors = COLOR_THEMES[config.colorTheme] || COLOR_THEMES.sky;
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // Apply mode
  if (config.mode === 'dark') {
    root.classList.add('dark');
    root.style.setProperty('--color-bg', '#0f172a');
    root.style.setProperty('--color-surface', '#1e293b');
    root.style.setProperty('--color-surface-2', '#334155');
    root.style.setProperty('--color-text', '#f1f5f9');
    root.style.setProperty('--color-text-muted', '#94a3b8');
    root.style.setProperty('--color-border', '#334155');
    root.style.setProperty('--color-bubble-recv', '#1e293b');
    root.style.setProperty('--color-bubble-recv-text', '#f1f5f9');
  } else {
    root.classList.remove('dark');
    root.style.setProperty('--color-bg', '#f8fafc');
    root.style.setProperty('--color-surface', '#ffffff');
    root.style.setProperty('--color-surface-2', '#f1f5f9');
    root.style.setProperty('--color-text', '#0f172a');
    root.style.setProperty('--color-text-muted', '#64748b');
    root.style.setProperty('--color-border', '#e2e8f0');
    root.style.setProperty('--color-bubble-recv', '#f1f5f9');
    root.style.setProperty('--color-bubble-recv-text', '#0f172a');
  }

  // Apply font size
  root.style.setProperty('--font-size-base', FONT_SIZES[config.fontSize] || '15px');

  // Apply bubble style
  const bubbleRadius = config.bubbleStyle === 'rounded' ? '18px' : config.bubbleStyle === 'square' ? '4px' : '0px';
  root.style.setProperty('--bubble-radius', bubbleRadius);

  // Apply background
  const backgrounds: Record<string, string> = {
    solid: 'var(--color-bg)',
    gradient: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-primary-light) 100%)',
    pattern1: 'var(--color-bg)',
    pattern2: 'var(--color-bg)',
  };
  root.style.setProperty('--chat-bg', backgrounds[config.background] || backgrounds.solid);
}
