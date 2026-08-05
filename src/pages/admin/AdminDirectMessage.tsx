import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminMessages } from '../../hooks/useAdminMessages';
import { Card, CardHeader, Button, Badge, SearchInput, Modal } from '../../components/admin';
import { useToast } from '../../components/admin/Toast';
import type { MessageType } from '../../lib/supabase';

interface UserData {
  id: string;
  full_name: string;
  username: string;
  email: string;
  avatar_url: string | null;
}

interface UserMessageThread {
  id: string;
  user_id: string;
  content: string;
  sent_at: string;
  is_from_admin: boolean;
  user: {
    full_name: string;
    username: string;
    avatar_url: string | null;
  };
}

const ADMIN_ID = '00000000-0000-0000-0000-000000000000';

export const AdminDirectMessage: React.FC = () => {
  const { showToast } = useToast();
  const { sendMessage } = useAdminMessages();
  
  // State
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);
  const [search, setSearch] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [messageType, setMessageType] = useState<MessageType>('text');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [threads, setThreads] = useState<Map<string, UserMessageThread[]>>(new Map());
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load users
  useEffect(() => {
    fetchUsers();
  }, []);

  // Subscribe to new messages
  useEffect(() => {
    const channel = supabase
      .channel('admin_direct_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_type=eq.admin`
        },
        () => {
          if (activeThread) {
            fetchThread(activeThread);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeThread]);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('users')
      .select('id, full_name, username, email, avatar_url')
      .order('created_at', { ascending: false })
      .limit(200);
    
    if (data) setUsers(data);
  };

  const fetchThread = async (userId: string) => {
    // Get messages between admin and this user
    const { data } = await supabase
      .from('messages')
      .select(`
        id,
        sender_id,
        content,
        created_at,
        sender_type,
        user:users!messages_sender_id_fkey(id, full_name, username, avatar_url)
      `)
      .or(`and(sender_id.eq.${ADMIN_ID},conversation_id.like.admin-${userId}),and(sender_id.eq.${userId},conversation_id.like.admin-${userId})`)
      .order('created_at', { ascending: true })
      .limit(50);

    if (data) {
      const threadsMap = new Map(threads);
      const formattedMessages: UserMessageThread[] = data.map((m: any) => ({
        id: m.id,
        user_id: m.sender_id,
        content: m.content,
        sent_at: m.created_at,
        is_from_admin: m.sender_type === 'admin',
        user: m.user || { full_name: 'Unknown', username: 'unknown', avatar_url: null }
      }));
      threadsMap.set(userId, formattedMessages);
      setThreads(threadsMap);
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectUser = (user: UserData) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearch('');
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
  };

  const handleUserClick = (userId: string) => {
    setActiveThread(userId);
    fetchThread(userId);
  };

  const handleSend = async () => {
    if (!content.trim() || selectedUsers.length === 0) {
      showToast('Please select recipients and enter a message', 'error');
      return;
    }

    setSending(true);
    try {
      for (const user of selectedUsers) {
        const conversationId = `admin-${user.id}`;
        
        // Create or update conversation
        const { data: existingConv } = await supabase
          .from('conversations')
          .select('id')
          .eq('id', conversationId)
          .single();

        if (!existingConv) {
          await supabase
            .from('conversations')
            .insert({
              id: conversationId,
              participant_1: ADMIN_ID,
              participant_2: user.id,
              last_message: content.trim(),
              last_message_at: new Date().toISOString()
            });
        } else {
          await supabase
            .from('conversations')
            .update({
              last_message: content.trim(),
              last_message_at: new Date().toISOString()
            })
            .eq('id', conversationId);
        }

        // Insert message
        await supabase
          .from('messages')
          .insert({
            conversation_id: conversationId,
            sender_id: ADMIN_ID,
            sender_type: 'admin',
            type: 'text',
            content: content.trim(),
            is_read: false
          });

        // Refresh thread if active
        if (activeThread === user.id) {
          fetchThread(user.id);
        }
      }

      showToast(`Message sent to ${selectedUsers.length} users!`, 'success');
      setContent('');
    } catch (error: any) {
      showToast('Failed to send message: ' + error.message, 'error');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Direct Messages</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Send direct messages to specific users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - User Selection */}
        <div className="lg:col-span-1 space-y-4">
          {/* Selected Users */}
          <Card>
            <CardHeader title="Recipients" subtitle="Select users to message" />
            
            <button
              onClick={() => setShowUserModal(true)}
              className="w-full p-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-slate-500 dark:text-slate-400 hover:border-sky-500 hover:text-sky-500 transition-colors mb-3"
            >
              + Add Recipients ({selectedUsers.length} selected)
            </button>

            {selectedUsers.length > 0 && (
              <div className="space-y-2">
                {selectedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-sm font-semibold">
                        {user.full_name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-slate-900 dark:text-white">{user.full_name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveUser(user.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader title="Recent Chats" subtitle="View conversation threads" />
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {users.slice(0, 10).map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeThread === user.id
                      ? 'bg-sky-50 dark:bg-sky-900/20'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-semibold">
                    {user.full_name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{user.full_name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Panel - Message Composition & Thread */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            {/* Message Type */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex gap-2">
                {(['text', 'announcement', 'warning', 'update'] as MessageType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setMessageType(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      messageType === type
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Thread (if active) */}
            {activeThread && threads.get(activeThread) && (
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 max-h-64 overflow-y-auto">
                <div className="space-y-3">
                  {threads.get(activeThread)?.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.is_from_admin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-xl ${
                          msg.is_from_admin
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.is_from_admin ? 'text-sky-100' : 'text-slate-400'}`}>
                          {formatTime(msg.sent_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Message Input */}
            <div className="p-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type your message..."
                    rows={3}
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Button
                  onClick={handleSend}
                  disabled={sending || selectedUsers.length === 0 || !content.trim()}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>🚀 Send to {selectedUsers.length || 0} users</>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* User Selection Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="Select Recipients"
        size="lg"
      >
        <div className="p-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search users..."
            className="mb-4"
          />
          
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredUsers.map((user) => {
              const isSelected = selectedUsers.find(u => u.id === user.id);
              return (
                <div
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 text-sky-500 rounded"
                  />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-semibold">
                    {user.full_name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate">{user.full_name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedUsers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button onClick={() => setShowUserModal(false)} className="w-full">
                Done ({selectedUsers.length})
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
