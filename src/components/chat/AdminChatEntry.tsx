import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';

const ADMIN_ID = '00000000-0000-0000-0000-000000000001'; // Special admin ID for official messages

interface AdminMessageData {
  id: string;
  message_type: string;
  title: string | null;
  content: string;
  created_at: string;
  is_read: boolean;
}

export const AdminChatEntry: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [latestMessage, setLatestMessage] = useState<AdminMessageData | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchLatestAdminMessage();
      subscribeToAdminMessages();
    }
  }, [user]);

  const fetchLatestAdminMessage = async () => {
    if (!user) return;

    // Get the latest admin message for this user
    const { data, error } = await supabase
      .rpc('get_user_admin_messages', { p_user_id: user.id });

    if (!error && data && data.length > 0) {
      const messages = data as AdminMessageData[];
      setLatestMessage(messages[0]);
      setUnreadCount(messages.filter(m => !m.is_read).length);
    }
  };

  const subscribeToAdminMessages = () => {
    if (!user) return;

    const channel = supabase
      .channel('admin_chat_entry')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_message_recipients',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchLatestAdminMessage();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleClick = () => {
    navigate('/chat/official');
  };

  // Don't render if no messages yet
  if (!latestMessage) return null;

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer rounded-xl mx-2"
    >
      {/* Avatar with verified badge */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          TC
        </div>
        {/* Verified Badge */}
        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-slate-900 dark:text-white">Voxra Official</span>
            <span className="px-1.5 py-0.5 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs rounded">
              Official
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {new Date(latestMessage.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
          {latestMessage.title || latestMessage.content}
        </p>
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xs text-white font-bold">{unreadCount}</span>
        </div>
      )}
    </div>
  );
};

// Separate page component for viewing admin messages
export const AdminMessagesPage: React.FC = () => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<AdminMessageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .rpc('get_user_admin_messages', { p_user_id: user.id });

    if (!error && data) {
      setMessages(data as AdminMessageData[]);
    }
    setLoading(false);
  };

  const markAsRead = async (messageId: string) => {
    if (!user) return;

    await supabase
      .from('admin_message_recipients')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('message_id', messageId)
      .eq('user_id', user.id)
      .eq('is_read', false);

    // Update local state
    setMessages(prev => 
      prev.map(m => 
        m.id === messageId 
          ? { ...m, is_read: true } 
          : m
      )
    );
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'announcement': return '📢';
      case 'warning': return '⚠️';
      case 'update': return '🆙';
      default: return '💬';
    }
  };

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'announcement': 
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800';
      case 'warning':
        return 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500';
      case 'update':
        return 'bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20';
      default:
        return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <span className="text-sky-600 font-bold text-lg">VO</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Voxra Official</h1>
            <p className="text-sky-100 text-sm">Official announcements and updates</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No messages from Voxra Official yet
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => !msg.is_read && markAsRead(msg.id)}
              className={`p-4 rounded-xl ${getMessageStyle(msg.message_type)} ${
                !msg.is_read ? 'cursor-pointer' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getMessageIcon(msg.message_type)}</span>
                <span className="font-semibold text-slate-900 dark:text-white capitalize">
                  {msg.message_type}
                </span>
                {!msg.is_read && (
                  <span className="px-2 py-0.5 bg-sky-500 text-white text-xs rounded-full ml-auto">
                    New
                  </span>
                )}
              </div>
              
              {msg.title && (
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  {msg.title}
                </h3>
              )}
              
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {msg.content}
              </p>
              
              <p className="text-xs text-slate-500 mt-3">
                {new Date(msg.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
