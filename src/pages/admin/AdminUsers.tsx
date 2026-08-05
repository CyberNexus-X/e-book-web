import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { SearchInput, Badge, Button, Card, Modal } from '../../components/admin';
import { useToast } from '../../components/admin/Toast';

interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
  is_online: boolean;
  is_banned: boolean;
  created_at: string;
  avatar_url?: string;
}

export const AdminUsers: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);
  const [banningUserId, setBanningUserId] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  // Fetch users
  const fetchUsers = useCallback(async () => {
    const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    if (data) setUsers(data);
    setLoading(false);
  }, []);

  // Setup realtime subscription for online status
  useEffect(() => {
    fetchUsers();

    // Subscribe to users table for real-time updates
    const usersSubscription = supabase
      .channel('admin-users-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
        if (payload.eventType === 'UPDATE' && payload.new) {
          const updatedUser = payload.new as unknown as User;
          setUsers(prev => prev.map(u => 
            u.id === updatedUser.id ? { ...u, ...updatedUser } : u
          ));
          // Update online users set
          if (updatedUser.is_online !== undefined) {
            setOnlineUsers(prev => {
              const newSet = new Set(prev);
              if (updatedUser.is_online) {
                newSet.add(updatedUser.id);
              } else {
                newSet.delete(updatedUser.id);
              }
              return newSet;
            });
          }
        } else if (payload.eventType === 'INSERT' && payload.new) {
          const newUser = payload.new as unknown as User;
          setUsers(prev => [newUser, ...prev]);
        } else if (payload.eventType === 'DELETE' && payload.old) {
          setUsers(prev => prev.filter(u => u.id !== payload.old.id));
        }
      })
      .subscribe();

    // Fetch initial online users
    const fetchOnlineUsers = async () => {
      const { data } = await supabase.from('users').select('id').eq('is_online', true);
      if (data) {
        setOnlineUsers(new Set(data.map(u => u.id)));
      }
    };
    fetchOnlineUsers();

    return () => {
      supabase.removeChannel(usersSubscription);
    };
  }, [fetchUsers]);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActionMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Ban/Unban user with loading state and toast
  const handleBanUser = async (userId: string, reason?: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const isBanning = !user.is_banned;
    const adminId = 'admin-user-id'; // Replace with actual admin ID
    
    setBanningUserId(userId);
    
    try {
      const updates: Record<string, unknown> = { 
        is_banned: isBanning,
        banned_at: isBanning ? new Date().toISOString() : null,
        banned_by: isBanning ? adminId : null,
        banned_reason: isBanning ? (reason || null) : null
      };

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;

      // Update local state immediately
      setUsers(users.map(u => 
        u.id === userId ? { ...u, ...updates } : u
      ));
      
      // Update selected user if modal is open
      if (selectedUser?.id === userId) {
        setSelectedUser({ ...selectedUser, ...updates });
      }

      showToast(
        isBanning ? 'User banned successfully' : 'User unbanned successfully',
        'success'
      );
    } catch (error) {
      console.error('Error banning user:', error);
      showToast('Failed to update user status', 'error');
    } finally {
      setBanningUserId(null);
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user? This will remove all their messages and data.')) return;
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (!error) {
      setUsers(users.filter(u => u.id !== id));
      showToast('User deleted successfully', 'success');
    } else {
      showToast('Failed to delete user', 'error');
    }
  };

  // Message user - redirect to admin messages
  const handleMessageUser = (user: User) => {
    // Navigate to admin messages route with userId
    navigate(`/1234/admin/messages/${user.id}`, { 
      state: { user } 
    });
    setShowModal(false);
    setActionMenuId(null);
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const openUserProfile = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
    setActionMenuId(null);
  };

  const handleActionClick = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    setActionMenuId(actionMenuId === userId ? null : userId);
  };

  const isUserOnline = (userId: string) => onlineUsers.has(userId);

  return (
    <div className="space-y-6 admin-page">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-white/50 mt-1">Manage all registered users</p>
      </div>

      {/* Stats & Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl backdrop-blur-sm">
            <span className="text-white/40 text-sm font-medium">Total: </span>
            <span className="font-bold text-white">{users.length}</span>
          </div>
          <div className="px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl backdrop-blur-sm">
            <span className="text-emerald-400 text-sm font-medium">Online: </span>
            <span className="font-bold text-emerald-300">{onlineUsers.size}</span>
          </div>
          <div className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <span className="text-red-400 text-sm font-medium">Banned: </span>
            <span className="font-bold text-red-300">{users.filter(u => u.is_banned).length}</span>
          </div>
        </div>
        
        <div className="w-full sm:w-80">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search users..."
          />
        </div>
      </div>

      {/* Table - Glass Style */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.03] backdrop-blur-sm sticky top-0 z-10">
              <tr className="border-b border-white/[0.08]">
                <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Username</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Joined</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center px-6 py-12">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-white/50 mt-3">Loading users...</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center px-6 py-12 text-white/50">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-white/[0.04] transition-colors cursor-pointer"
                    onClick={() => openUserProfile(user)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-semibold shadow-md">
                            {user.full_name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          {isUserOnline(user.id) && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0d0d1a] rounded-full online-dot"></span>
                          )}
                        </div>
                        <span className="font-medium text-white">{user.full_name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-violet-400 font-medium">@{user.username || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 text-white/70">{user.email || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.is_banned ? (
                          <Badge variant="glass-danger">Banned</Badge>
                        ) : isUserOnline(user.id) ? (
                          <Badge variant="glass-success">Online</Badge>
                        ) : (
                          <Badge variant="glass">Offline</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/50 text-sm">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="relative">
                        <button
                          onClick={(e) => handleActionClick(e, user.id)}
                          className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                        
                        {actionMenuId === user.id && (
                          <div className="absolute right-0 mt-2 w-56 bg-[#0d0d1a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl py-1 z-20 overflow-hidden">
                            <button
                              onClick={() => openUserProfile(user)}
                              className="w-full px-4 py-2.5 text-left text-sm text-white/70 hover:bg-white/[0.06] hover:text-white flex items-center gap-3 transition-colors"
                            >
                              <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              View Profile
                            </button>
                            <button
                              onClick={() => handleMessageUser(user)}
                              className="w-full px-4 py-2.5 text-left text-sm text-white/70 hover:bg-white/[0.06] hover:text-white flex items-center gap-3 transition-colors"
                            >
                              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              Message
                            </button>
                            <button
                              onClick={() => handleBanUser(user.id)}
                              disabled={banningUserId === user.id}
                              className="w-full px-4 py-2.5 text-left text-sm text-amber-400 hover:bg-white/[0.06] flex items-center gap-3 transition-colors disabled:opacity-50"
                            >
                              {banningUserId === user.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                  </svg>
                                  {user.is_banned ? 'Unban User' : 'Ban User'}
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-white/[0.06] flex items-center gap-3 transition-colors"
                            >
                              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete User
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* User Profile Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="User Profile"
        size="lg"
      >
        {selectedUser && (
          <div className="p-6">
            {/* User Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {selectedUser.full_name?.charAt(0).toUpperCase() || 'U'}
                </div>
                {isUserOnline(selectedUser.id) && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-3 border-[#0d0d1a] rounded-full online-dot"></span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedUser.full_name || 'N/A'}</h3>
                <p className="text-violet-400 font-medium">@{selectedUser.username || 'N/A'}</p>
                <p className="text-white/40 text-sm">{selectedUser.email || 'N/A'}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">
                  {isUserOnline(selectedUser.id) ? '🟢' : '⚫'}
                </p>
                <p className="text-sm text-white/40">{isUserOnline(selectedUser.id) ? 'Online' : 'Offline'}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">
                  {selectedUser.is_banned ? '🚫' : '✓'}
                </p>
                <p className="text-sm text-white/40">{selectedUser.is_banned ? 'Banned' : 'Active'}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">
                  {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                </p>
                <p className="text-sm text-white/40">Joined</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="glass-primary"
                className="flex-1"
                onClick={() => handleMessageUser(selectedUser)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Message
              </Button>
              <Button 
                variant={selectedUser.is_banned ? "glass-success" : "glass-danger"} 
                className="flex-1"
                onClick={() => handleBanUser(selectedUser.id)}
                disabled={banningUserId === selectedUser.id}
              >
                {banningUserId === selectedUser.id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : selectedUser.is_banned ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unban User
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    Ban User
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
