import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { ThemeConfig } from '../lib/supabase';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  config: ThemeConfig;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setConfig: (config: Partial<ThemeConfig>) => void;
  saveTheme: (userId: string, config: ThemeConfig) => Promise<void>;
  resetTheme: (userId: string) => Promise<void>;
}

const defaultConfig: ThemeConfig = {
  colorTheme: 'sky',
  mode: 'light',
  bubbleStyle: 'rounded',
  fontSize: 'medium',
  background: 'solid',
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      config: defaultConfig,
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
      }),
      setTheme: (theme) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme });
      },
      setConfig: (partial) => set((state) => ({
        config: { ...state.config, ...partial }
      })),
      saveTheme: async (userId: string, config: ThemeConfig) => {
        await supabase.from('users').update({ theme_config: config }).eq('id', userId);
        set({ config });
      },
      resetTheme: async (userId: string) => {
        await supabase.from('users').update({ theme_config: defaultConfig }).eq('id', userId);
        set({ config: defaultConfig });
      },
    }),
    {
      name: 'user-theme-storage',
    }
  )
);

// Initialize theme on app load - call this BEFORE React renders
// This prevents flash of wrong theme
export const initializeUserTheme = () => {
  const storedTheme = localStorage.getItem('user-theme-storage');
  if (storedTheme) {
    try {
      const parsed = JSON.parse(storedTheme);
      const theme = parsed.state?.theme;
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // If parsing fails, default to light
      document.documentElement.classList.remove('dark');
    }
  }
};
