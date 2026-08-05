import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AppSettings {
  allow_registration: boolean;
  email_verification: boolean;
  random_chat_enabled: boolean;
  status_updates_enabled: boolean;
  anonymous_reporting: boolean;
  auto_moderate_spam: boolean;
}

interface AppSettingsStore extends AppSettings {
  loading: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
  updateSetting: (key: keyof AppSettings, value: boolean) => Promise<void>;
}

export const useAppSettingsStore = create<AppSettingsStore>((set, get) => ({
  // Default values
  allow_registration: true,
  email_verification: false,
  random_chat_enabled: true,
  status_updates_enabled: true,
  anonymous_reporting: true,
  auto_moderate_spam: false,
  
  loading: false,
  error: null,

  fetchSettings: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('key, value');
      
      if (error) throw error;

      // Convert array to object
      const settings: Partial<AppSettings> = {};
      data?.forEach((item) => {
        const key = item.key as keyof AppSettings;
        if (key in settings) {
          settings[key] = item.value === 'true';
        }
      });

      set({
        ...settings,
        loading: false,
      });
    } catch (error: any) {
      console.error('Error fetching app settings:', error);
      set({ 
        loading: false, 
        error: 'Failed to load settings' 
      });
    }
  },

  updateSetting: async (key: keyof AppSettings, value: boolean) => {
    const previousValue = get()[key];
    
    // Optimistic update
    set({ [key]: value } as Pick<AppSettings, keyof AppSettings>);
    
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({ 
          key, 
          value: value.toString(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error updating setting:', error);
      // Rollback on error
      set({ [key]: previousValue } as Pick<AppSettings, keyof AppSettings>);
      set({ error: 'Failed to save setting' });
    }
  },
}));
