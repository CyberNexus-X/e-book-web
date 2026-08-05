import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminMessages, useAdminMessageTemplates } from '../../hooks/useAdminMessages';
import { Card, CardHeader, Button, Badge, SearchInput, Modal } from '../../components/admin';
import { useToast } from '../../components/admin/Toast';
import type { MessageType } from '../../lib/supabase';

interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
  avatar_url: string | null;
}

const messageTypes: { value: MessageType; label: string; icon: string; variant: 'default' | 'success' | 'warning' | 'danger' | 'info' }[] = [
  { value: 'text', label: 'Text', icon: '💬', variant: 'default' },
  { value: 'announcement', label: 'Announcement', icon: '📢', variant: 'info' },
  { value: 'warning', label: 'Warning', icon: '⚠️', variant: 'danger' },
  { value: 'update', label: 'Update', icon: '🆙', variant: 'success' },
];

export const AdminComposeMessage: React.FC = () => {
  const { showToast } = useToast();
  const { createMessage, sendMessage, fetchMessages } = useAdminMessages();
  const { templates, fetchTemplates } = useAdminMessageTemplates();
  
  // Form state
  const [messageType, setMessageType] = useState<MessageType>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isBroadcast, setIsBroadcast] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  
  // UI state
  const [activeTab, setActiveTab] = useState<'compose' | 'templates'>('compose');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [sending, setSending] = useState(false);
  
  // User search
  const [users, setUsers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  useEffect(() => {
    if (showUserModal) {
      fetchUsers();
    }
  }, [showUserModal]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    const { data } = await supabase
      .from('users')
      .select('id, full_name, username, email, avatar_url')
      .order('created_at', { ascending: false })
      .limit(200);
    
    if (data) setUsers(data);
    setLoadingUsers(false);
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.username?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleSelectUser = (user: User) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setUserSearch('');
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
  };

  const applyTemplate = (template: typeof templates[0]) => {
    setMessageType(template.message_type);
    setTitle('');
    setContent(template.content);
    setActiveTab('compose');
    showToast('Template applied', 'success');
  };

  const handleSaveDraft = async () => {
    if (!content.trim()) {
      showToast('Please enter a message', 'error');
      return;
    }

    setSending(true);
    try {
      await createMessage(
        content,
        messageType,
        messageType === 'announcement' ? title : null,
        isBroadcast,
        isBroadcast ? undefined : selectedUsers.map(u => u.id),
        undefined
      );
      showToast('Draft saved successfully', 'success');
      resetForm();
      fetchMessages();
    } catch (error: any) {
      showToast('Failed to save draft: ' + error.message, 'error');
    } finally {
      setSending(false);
    }
  };

  const handleSend = async () => {
    if (!content.trim()) {
      showToast('Please enter a message', 'error');
      return;
    }

    if (!isBroadcast && selectedUsers.length === 0) {
      showToast('Please select at least one recipient', 'error');
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmSend = async () => {
    setSending(true);
    setShowConfirmModal(false);
    
    try {
      const scheduledAt = scheduleEnabled && scheduledDate && scheduledTime
        ? new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
        : undefined;

      const message = await createMessage(
        content,
        messageType,
        messageType === 'announcement' ? title : null,
        isBroadcast,
        isBroadcast ? undefined : selectedUsers.map(u => u.id),
        scheduledAt
      );

      if (!scheduledAt) {
        await sendMessage(message.id, isBroadcast ? undefined : selectedUsers.map(u => u.id));
      }

      showToast(scheduledAt 
        ? `Message scheduled for ${new Date(scheduledAt).toLocaleString()}`
        : `Message sent to ${isBroadcast ? 'all users' : selectedUsers.length + ' users'}!`, 
        'success'
      );
      
      resetForm();
      fetchMessages();
    } catch (error: any) {
      showToast('Failed to send message: ' + error.message, 'error');
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setMessageType('text');
    setTitle('');
    setContent('');
    setIsBroadcast(true);
    setSelectedUsers([]);
    setScheduleEnabled(false);
    setScheduledDate('');
    setScheduledTime('');
  };

  // Format date for input
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Compose Message</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Create and send messages to users</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
        <button
          onClick={() => setActiveTab('compose')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'compose'
              ? 'bg-sky-500 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          ✍️ Compose
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'templates'
              ? 'bg-sky-500 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          📋 Templates
        </button>
      </div>

      {activeTab === 'compose' ? (
        <>
          {/* Message Type Selector */}
          <Card>
            <CardHeader title="Message Type" subtitle="Choose the type of message" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {messageTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setMessageType(type.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    messageType === type.value
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-medium text-slate-900 dark:text-white">{type.label}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Message Content */}
          <Card>
            <CardHeader title="Message Content" subtitle="Write your message" />
            <div className="space-y-4">
              {/* Title (for announcements) */}
              {messageType === 'announcement' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Announcement title..."
                    className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
              )}

              {/* Rich Text Area */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message Content
                </label>
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  {/* Toolbar */}
                  <div className="flex gap-1 p-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded" title="Bold">
                      <span className="font-bold">B</span>
                    </button>
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded" title="Italic">
                      <span className="italic">I</span>
                    </button>
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded" title="Underline">
                      <span className="underline">U</span>
                    </button>
                    <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                    <button 
                      onClick={() => setShowTemplateModal(true)}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-sm"
                      title="Insert Template"
                    >
                      📋 Templates
                    </button>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your message..."
                    rows={6}
                    className="w-full p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Recipients
                </label>
                <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <input
                    type="checkbox"
                    checked={isBroadcast}
                    onChange={(e) => {
                      setIsBroadcast(e.target.checked);
                      if (e.target.checked) setSelectedUsers([]);
                    }}
                    className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
                  />
                  <span className="text-slate-900 dark:text-white">Send to all users</span>
                </div>

                {!isBroadcast && (
                  <div className="mt-3">
                    <button
                      onClick={() => setShowUserModal(true)}
                      className="w-full p-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-slate-500 dark:text-slate-400 hover:border-sky-500 hover:text-sky-500 transition-colors"
                    >
                      + Add Recipients ({selectedUsers.length} selected)
                    </button>

                    {/* Selected Users Chips */}
                    {selectedUsers.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedUsers.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center gap-2 px-3 py-1.5 bg-sky-100 dark:bg-sky-900/30 rounded-full text-sm"
                          >
                            <span className="text-slate-900 dark:text-white">{user.full_name}</span>
                            <button
                              onClick={() => handleRemoveUser(user.id)}
                              className="text-slate-500 hover:text-red-500"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Schedule */}
              <div>
                <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <input
                    type="checkbox"
                    checked={scheduleEnabled}
                    onChange={(e) => setScheduleEnabled(e.target.checked)}
                    className="w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
                  />
                  <span className="text-slate-900 dark:text-white">Schedule for later</span>
                </div>

                {scheduleEnabled && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={minDate}
                        className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="secondary"
                  onClick={() => setShowPreviewModal(true)}
                  disabled={!content.trim()}
                >
                  👁️ Preview
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleSaveDraft}
                  disabled={sending || !content.trim()}
                >
                  💾 Save as Draft
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={sending || !content.trim() || (!isBroadcast && selectedUsers.length === 0)}
                  className="flex-1"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : scheduleEnabled ? (
                    <>📅 Schedule Message</>
                  ) : (
                    <>🚀 Send Message</>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </>
      ) : (
        /* Templates Tab */
        <Card>
          <CardHeader title="Message Templates" subtitle="Use pre-made templates for quick messaging" />
          <div className="space-y-3">
            {templates.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                No templates yet. Save a draft to create a template.
              </div>
            ) : (
              templates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-sky-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-900 dark:text-white">{template.title}</span>
                        <Badge variant={messageTypes.find(t => t.value === template.message_type)?.variant || 'default'}>
                          {template.message_type}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{template.content}</p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => applyTemplate(template)}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}

      {/* User Selection Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="Select Recipients"
        size="lg"
      >
        <div className="p-4">
          <SearchInput
            value={userSearch}
            onChange={setUserSearch}
            placeholder="Search users..."
            className="mb-4"
          />
          
          <div className="max-h-96 overflow-y-auto space-y-2">
            {loadingUsers ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-slate-500 mt-2">Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                No users found
              </div>
            ) : (
              filteredUsers.map((user) => {
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
              })
            )}
          </div>

          {selectedUsers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 mb-2">{selectedUsers.length} users selected</p>
              <Button onClick={() => setShowUserModal(false)} className="w-full">
                Done ({selectedUsers.length})
              </Button>
            </div>
          )}
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Message Preview"
        size="md"
      >
        <div className="p-4">
          <div className={`p-4 rounded-xl ${
            messageType === 'announcement' 
              ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800' 
              : messageType === 'warning'
              ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'
              : messageType === 'update'
              ? 'bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20'
              : 'bg-slate-50 dark:bg-slate-800'
          }`}>
            {messageType === 'announcement' && title && (
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-2">{title}</h3>
            )}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
              <div>
                <span className="font-medium text-slate-900 dark:text-white">Voxra Official</span>
                <Badge variant="info" className="ml-2 text-xs">Official</Badge>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{content}</p>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Message"
        size="sm"
      >
        <div className="p-4">
          <div className="text-center mb-4">
            <div className="w-16 h-16 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">📨</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Ready to send?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              This message will be sent to{' '}
              <span className="font-semibold text-sky-500">
                {isBroadcast ? 'all users' : `${selectedUsers.length} selected users`}
              </span>
            </p>
          </div>
          
          {scheduleEnabled && scheduledDate && scheduledTime && (
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 mb-4 text-center">
              <p className="text-sm text-slate-500">Scheduled for:</p>
              <p className="font-medium text-slate-900 dark:text-white">
                {new Date(`${scheduledDate}T${scheduledTime}`).toLocaleString()}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmSend}
              className="flex-1"
            >
              {scheduleEnabled ? 'Schedule' : 'Send Now'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Template Quick Access Modal */}
      <Modal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        title="Insert Template"
        size="md"
      >
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                applyTemplate(template);
                setShowTemplateModal(false);
              }}
              className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-slate-900 dark:text-white">{template.title}</span>
                <span className="text-xs text-slate-500">({template.message_type})</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{template.content}</p>
            </div>
          ))}
          {templates.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No templates available
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
