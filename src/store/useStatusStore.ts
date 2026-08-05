import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Status } from '../lib/supabase';

interface StatusState {
  statuses: Status[];
  loading: boolean;
  fetchStatuses: (userId: string) => Promise<void>;
  addStatus: (s: Status) => void;
  deleteStatus: (id: string) => Promise<void>;
}

export const useStatusStore = create<StatusState>((set) => ({
  statuses: [],
  loading: false,

  fetchStatuses: async (_userId) => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('statuses')
      .select('*, user:users(id, full_name, username, avatar_url)')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });
    if (!error && data) {
      set({ statuses: data as Status[] });
    }
    set({ loading: false });
  },

  addStatus: (s) => set((state) => ({ statuses: [s, ...state.statuses] })),

  deleteStatus: async (id) => {
    await supabase.from('statuses').delete().eq('id', id);
    set((state) => ({ statuses: state.statuses.filter((s) => s.id !== id) }));
  },
}));
