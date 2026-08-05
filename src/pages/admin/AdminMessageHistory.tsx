import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminMessages, useAdminMessageRealtime } from '../../hooks/useAdminMessages';
import { Card, CardHeader, Button, Badge, SearchInput, Modal } from '../../components/admin';
import { useToast } from '../../components/admin/Toast';
import type { AdminMessage, MessageType, AdminMessageStatus } from '../../lib/supabase';

const statusColors: Record<AdminMessageStatus, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  draft: 'default',
  scheduled: 'warning',
  sent: 'success'
};

const messageTypeColors: Record<MessageType, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  text: 'default',
  announcement: 'info',
  warning: 'danger',
  update: 'success'
};

interface RecipientData {
  id: string;
  user_id: string;
  is_delivered: boolean;
  is_read: boolean;
  read_at: string | null;
  delivered_at: string | null;
  user: {
    id: string;
    full_name: string;
    username: string;
    avatar_url: string | null;
  };
}

export const AdminMessageHistory: React.FC = () => {
  const { showToast } = useToast();
  const { messages, loading, fetchMessages, deleteMessage, getMessageAnalytics, getRecipients } = useAdminMessages();
  const [filter, setFilter] = useState<'all' | 'broadcast' | 'direct' | 'scheduled' | 'draft'>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [recipients, setRecipients] = useState<RecipientData[]>([]);
  const [analytics, setAnalytics] = useState<{ total: number; delivered: number; read: number }>({
    total: 0,
    delivered: 0,
    read: 0
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Subscribe to real-time updates
  useAdminMessageRealtime(() => {
    fetchMessages();
  });

  const filteredMessages = messages.filter(msg => {
    // Filter by type
    if (filter === 'broadcast' && !msg.is_broadcast) return false;
    if (filter === 'direct' && msg.is_broadcast) return false;
    if (filter === 'scheduled' && msg.status !== 'scheduled') return false;
    if (filter === 'draft' && msg.status !== 'draft') return false;
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        msg.content?.toLowerCase().includes(searchLower) ||
        msg.title?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const handleExpand = async (msg: AdminMessage) => {
    if (expandedId === msg.id) {
      setExpandedId(null);
      return;
    }
    
    setExpandedId(msg.id);
    
    try {
      const [recipientsData, analyticsData] = await Promise.all([
        getRecipients(msg.id),
        getMessageAnalytics(msg.id)
      ]);
      
      setRecipients(recipientsData as RecipientData[]);
      setAnalytics({
        total: analyticsData.total_recipients || 0,
        delivered: analyticsData.delivered_count || 0,
        read: analyticsData.read_count || 0
      });
    } catch (error) {
      console.error('Error fetching message details:', error);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    
    try {
      await deleteMessage(deletingId);
      showToast('Message deleted successfully', 'success');
      setShowDeleteModal(false);
      setDeletingId(null);
      fetchMessages();
    } catch (error: any) {
      showToast('Failed to delete message: ' + error.message, 'error');
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  };

  const getReadPercentage = () => {
    if (analytics.total === 0) return 0;
    return Math.round((analytics.read / analytics.total) * 100);
  };

  const getDeliveredPercentage = () => {
    if (analytics.total === 0) return 0;
    return Math.round((analytics.delivered / analytics.total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Message History</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">View and manage sent messages</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          {(['all', 'broadcast', 'direct', 'scheduled', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex-1 max-w-md">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search messages..."
          />
        </div>
      </div>

      {/* Messages Table */}
      <Card>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No messages found
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredMessages.map((msg) => (
              <div key={msg.id}>
                {/* Main Row */}
                <div 
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  onClick={() => handleExpand(msg)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {msg.title && (
                          <span className="font-medium text-slate-900 dark:text-white">{msg.title}</span>
                        )}
                        <Badge variant={messageTypeColors[msg.message_type]}>
                          {msg.message_type}
                        </Badge>
                        <Badge variant={statusColors[msg.status]}>
                          {msg.status}
                        </Badge>
                        {msg.is_broadcast && (
                          <span className="text-xs text-slate-500">📢 Broadcast</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {msg.content}
                      </p>
                    </div>
                    
                    <div className="text-right text-sm text-slate-500 whitespace-nowrap">
                      {msg.status === 'sent' && (
                        <div className="mb-1">Sent: {formatDate(msg.sent_at)}</div>
                      )}
                      {msg.status === 'scheduled' && (
                        <div className="mb-1">Scheduled: {formatDate(msg.scheduled_at)}</div>
                      )}
                      {msg.status === 'draft' && (
                        <div className="mb-1">Created: {formatDate(msg.created_at)}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === msg.id && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                    {/* Analytics */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{analytics.total}</div>
                        <div className="text-sm text-slate-500">Total Recipients</div>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{analytics.delivered}</div>
                        <div className="text-sm text-slate-500">Delivered ({getDeliveredPercentage()}%)</div>
                      </div>
                      <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                        <div className="text-2xl font-bold text-sky-600">{analytics.read}</div>
                        <div className="text-sm text-slate-500">Read ({getReadPercentage()}%)</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Delivery progress</span>
                        <span className="text-slate-700 dark:text-slate-300">{getReadPercentage()}% read</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-sky-500 rounded-full transition-all duration-300"
                          style={{ width: `${getReadPercentage()}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Recipients List */}
                    {recipients.length > 0 && (
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white mb-2">Recipients</h4>
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {recipients.map((r) => (
                            <div
                              key={r.id}
                              className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-sm font-semibold">
                                  {r.user?.full_name?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <span className="text-sm text-slate-900 dark:text-white">
                                  {r.user?.full_name || 'Unknown User'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {r.is_delivered ? (
                                  <Badge variant="success" size="sm">Delivered</Badge>
                                ) : (
                                  <Badge variant="default" size="sm">Pending</Badge>
                                )}
                                {r.is_read ? (
                                  <Badge variant="info" size="sm">Read</Badge>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      {msg.status === 'draft' && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingId(msg.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          🗑️ Delete
                        </Button>
                      )}
                      {msg.status === 'sent' && !msg.is_broadcast && analytics.read === 0 && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingId(msg.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          🔙 Recall
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingId(null);
        }}
        title="Delete Message"
        size="sm"
      >
        <div className="p-4">
          <div className="text-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🗑️</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Delete this message?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              This action cannot be undone. The message will be permanently removed.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setDeletingId(null);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
