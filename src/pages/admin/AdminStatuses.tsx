import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { SearchInput, Badge, Button, Card, Modal, StatCard } from '../../components/admin';

interface Status {
  id: string;
  content: string;
  visibility: string;
  expires_at: string;
  created_at: string;
  user?: {
    username: string;
    full_name: string;
  };
}

export const AdminStatuses: React.FC = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'anyone' | 'contacts'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    const { data } = await supabase
      .from('statuses')
      .select('*, user:users(username, full_name)')
      .order('created_at', { ascending: false });
    if (data) setStatuses(data);
    setLoading(false);
  };

  const deleteStatus = async (id: string) => {
    if (!confirm('Are you sure you want to delete this status?')) return;
    const { error } = await supabase.from('statuses').delete().eq('id', id);
    if (!error) setStatuses(statuses.filter(s => s.id !== id));
  };

  const bulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} statuses?`)) return;
    const { error } = await supabase.from('statuses').delete().in('id', selectedIds);
    if (!error) {
      setStatuses(statuses.filter(s => !selectedIds.includes(s.id)));
      setSelectedIds([]);
    }
  };

  const filteredStatuses = statuses.filter(s => {
    const matchesSearch = !search || 
      s.content?.toLowerCase().includes(search.toLowerCase()) ||
      s.user?.username?.toLowerCase().includes(search.toLowerCase()) ||
      s.user?.full_name?.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === 'all' || s.visibility === filter;
    
    return matchesSearch && matchesFilter;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStatuses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStatuses.map(s => s.id));
    }
  };

  const openPreview = (status: Status) => {
    setSelectedStatus(status);
    setShowPreviewModal(true);
  };

  // Calculate stats
  const totalActive = statuses.filter(s => !s.expires_at || new Date(s.expires_at) > new Date()).length;
  const publicStatuses = statuses.filter(s => s.visibility === 'anyone').length;
  const reportedStatuses = 0; // Mock data - would come from reports table

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Statuses</h1>
        <p className="text-slate-500 mt-1">Manage all user statuses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Statuses"
          value={statuses.length}
          icon={<svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          color="#8b5cf6"
          bgColor="rgba(139, 92, 246, 0.1)"
        />
        <StatCard
          label="Active Now"
          value={totalActive}
          icon={<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
          color="#22c55e"
          bgColor="rgba(34, 197, 94, 0.1)"
        />
        <StatCard
          label="Public Views"
          value={publicStatuses}
          icon={<svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
          color="#0ea5e9"
          bgColor="rgba(14, 165, 233, 0.1)"
        />
        <StatCard
          label="Reported"
          value={reportedStatuses}
          icon={<svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
          color="#ef4444"
          bgColor="rgba(239, 68, 68, 0.1)"
        />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-full sm:w-80">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search statuses..."
            />
          </div>
          
          <div className="flex rounded-xl bg-white border border-slate-200 p-1 shadow-sm">
            {(['all', 'anyone', 'contacts'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f === 'anyone' ? 'Public' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {selectedIds.length > 0 && (
          <Button variant="danger" onClick={bulkDelete} className="shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H2 2 7.862a0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1-1 1 0 00v3M4 7h16" />
            </svg>
            Delete Selected ({selectedIds.length})
          </Button>
        )}
      </div>

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10">
              <tr className="border-b border-slate-200">
                <th className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredStatuses.length && filteredStatuses.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                  />
                </th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Author</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Content</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Visibility</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Expires</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Created</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center px-6 py-12">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-slate-500 mt-3">Loading statuses...</p>
                  </td>
                </tr>
              ) : filteredStatuses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center px-6 py-12 text-slate-500">
                    No statuses found
                  </td>
                </tr>
              ) : (
                filteredStatuses.map((status) => (
                  <tr 
                    key={status.id} 
                    className="hover:bg-violet-50/30 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(status.id)}
                        onChange={() => toggleSelect(status.id)}
                        className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                          {status.user?.full_name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{status.user?.full_name || 'Unknown'}</p>
                          <p className="text-xs text-sky-600">@{status.user?.username || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      <p 
                        className="text-slate-600 text-sm truncate cursor-pointer hover:text-sky-600 transition-colors"
                        onClick={() => openPreview(status)}
                      >
                        {status.content || 'No content'}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={status.visibility === 'anyone' ? 'info' : 'default'}>
                        {status.visibility === 'anyone' ? '🌐 Public' : '👥 Contacts'}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-slate-600 text-sm">
                      {status.expires_at ? new Date(status.expires_at).toLocaleString() : 'Never'}
                    </td>
                    <td className="px-4 py-4 text-slate-600 text-sm">
                      {status.created_at ? new Date(status.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openPreview(status)}
                          className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-sky-600"
                          title="Preview"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteStatus(status.id)}
                          className="p-2.5 hover:bg-red-50 rounded-xl transition-colors text-slate-500 hover:text-red-600"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Status Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Status Preview"
        size="lg"
      >
        {selectedStatus && (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-semibold shadow-md">
                {selectedStatus.user?.full_name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-medium text-slate-900">{selectedStatus.user?.full_name || 'Unknown'}</p>
                <p className="text-sm text-slate-500">@{selectedStatus.user?.username || 'N/A'}</p>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
              <p className="text-slate-900 whitespace-pre-wrap">
                {selectedStatus.content || 'No content'}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
              <span className="px-3 py-1 bg-slate-100 rounded-lg">Visibility: {selectedStatus.visibility === 'anyone' ? '🌐 Public' : '👥 Contacts'}</span>
              <span className="px-3 py-1 bg-slate-100 rounded-lg">Expires: {selectedStatus.expires_at ? new Date(selectedStatus.expires_at).toLocaleString() : 'Never'}</span>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="danger" 
                className="flex-1"
                onClick={() => {
                  deleteStatus(selectedStatus.id);
                  setShowPreviewModal(false);
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Status
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
