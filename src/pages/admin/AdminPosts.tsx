import React, { useState, useEffect } from 'react';
import { supabase, type Post } from '../../lib/supabase';
import { SearchInput, Badge, Button, Card, Modal, StatCard } from '../../components/admin';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'anyone' | 'contacts'>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*, user:users(id, username, full_name, avatar_url)')
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const { error } = await supabase.from('posts').update({ is_deleted: true }).eq('id', id);
    if (!error) setPosts(posts.filter(p => p.id !== id));
  };

  const bulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} posts?`)) return;
    const updates = selectedIds.map(id => ({ id, is_deleted: true }));
    const { error } = await supabase.from('posts').upsert(updates);
    if (!error) {
      setPosts(posts.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const filteredPosts = posts.filter(p => {
    const matchesSearch = !search || 
      p.content?.toLowerCase().includes(search.toLowerCase()) ||
      (p.user as any)?.username?.toLowerCase().includes(search.toLowerCase()) ||
      (p.user as any)?.full_name?.toLowerCase().includes(search.toLowerCase());
      
    const matchesFilter = filter === 'all' || p.visibility === filter;
    
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
    if (selectedIds.length === filteredPosts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredPosts.map(p => p.id));
    }
  };

  const openPreview = (post: Post) => {
    setSelectedPost(post);
    setShowPreviewModal(true);
  };

  // Stats
  const totalPosts = posts.length;
  const publicPosts = posts.filter(p => p.visibility === 'anyone').length;
  const privatePosts = posts.filter(p => p.visibility === 'contacts').length;
  const permanentPosts = posts.filter(p => p.duration_type === 'permanent').length;

  return (
    <div className="space-y-6 admin-page">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Posts Management</h1>
        <p className="text-white/50 mt-1">Manage all user posts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Posts"
          value={totalPosts}
          icon={<svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          color="#8b5cf6"
          bgColor="rgba(139, 92, 246, 0.1)"
        />
        <StatCard
          label="Public Posts"
          value={publicPosts}
          icon={<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>}
          color="#22c55e"
          bgColor="rgba(34, 197, 94, 0.1)"
        />
        <StatCard
          label="Private Posts"
          value={privatePosts}
          icon={<svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          color="#0ea5e9"
          bgColor="rgba(14, 165, 233, 0.1)"
        />
        <StatCard
          label="Permanent"
          value={permanentPosts}
          icon={<svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
          color="#f97316"
          bgColor="rgba(249, 115, 22, 0.1)"
        />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-full sm:w-80">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search posts..."
            />
          </div>
          
          <div className="flex rounded-xl bg-white/[0.05] border border-white/[0.1] p-1">
            {(['all', 'anyone', 'contacts'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white' 
                    : 'text-white/50 hover:text-white hover:bg-white/[0.06]'
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H2 2 7.862a0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                    checked={selectedIds.length === filteredPosts.length && filteredPosts.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                  />
                </th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Author</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Content</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Design</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Visibility</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Duration</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Created</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center px-6 py-12">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-slate-500 mt-3">Loading posts...</p>
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center px-6 py-12 text-slate-500">
                    No posts found
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-violet-50/30 transition-colors">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(post.id)}
                        onChange={() => toggleSelect(post.id)}
                        className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                          {(post.user as any)?.full_name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{(post.user as any)?.full_name || 'Unknown'}</p>
                          <p className="text-xs text-violet-600">@{(post.user as any)?.username || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 max-w-xs">
                      <p 
                        className="text-slate-600 text-sm truncate cursor-pointer hover:text-sky-600 transition-colors"
                        onClick={() => openPreview(post)}
                      >
                        {post.content || 'No content'}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {post.gradient ? (
                          <div 
                            className="w-6 h-6 rounded"
                            style={{ background: post.gradient }}
                          />
                        ) : (
                          <div 
                            className="w-6 h-6 rounded border border-slate-200"
                            style={{ backgroundColor: post.background_color || 'white' }}
                          />
                        )}
                        <span className="text-xs text-slate-500">{post.font_size}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={post.visibility === 'anyone' ? 'info' : 'default'}>
                        {post.visibility === 'anyone' ? '🌐 Public' : '👥 Contacts'}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-slate-600 text-sm">
                      <Badge variant={post.duration_type === 'permanent' ? 'success' : 'default'}>
                        {post.duration_type === 'permanent' ? '♾️ Permanent' : post.duration_type}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-slate-600 text-sm">
                      {dayjs(post.created_at).fromNow()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openPreview(post)}
                          className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-sky-600"
                          title="Preview"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
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

      {/* Post Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Post Preview"
        size="lg"
      >
        {selectedPost && (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-semibold shadow-md">
                {(selectedPost.user as any)?.full_name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-medium text-slate-900">{(selectedPost.user as any)?.full_name || 'Unknown'}</p>
                <p className="text-sm text-slate-500">@{(selectedPost.user as any)?.username || 'N/A'}</p>
              </div>
            </div>
            
            {/* Post Content Preview */}
            <div 
              className="rounded-xl p-6 mb-4 border border-slate-100"
              style={{ 
                background: selectedPost.gradient || selectedPost.background_color || 'white',
                minHeight: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p 
                className="text-center"
                style={{ 
                  color: selectedPost.text_color || 'black',
                  fontSize: selectedPost.font_size === 'small' ? '14px' : selectedPost.font_size === 'large' ? '24px' : '18px',
                }}
              >
                {selectedPost.content || 'No content'}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
              <span className="px-3 py-1 bg-slate-100 rounded-lg">
                Visibility: {selectedPost.visibility === 'anyone' ? '🌐 Public' : '👥 Contacts'}
              </span>
              <span className="px-3 py-1 bg-slate-100 rounded-lg">
                Duration: {selectedPost.duration_type === 'permanent' ? '♾️ Permanent' : selectedPost.duration_type}
              </span>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="danger" 
                className="flex-1"
                onClick={() => {
                  deletePost(selectedPost.id);
                  setShowPreviewModal(false);
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Post
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
