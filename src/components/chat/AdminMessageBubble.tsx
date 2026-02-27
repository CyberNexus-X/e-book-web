import React from 'react';
import type { MessageType } from '../../lib/supabase';

interface AdminMessageBubbleProps {
  content: string;
  messageType: MessageType;
  title?: string | null;
  sentAt: string;
  isRead: boolean;
  onOpen?: () => void;
}

const messageTypeStyles: Record<MessageType, {
  container: string;
  icon: string;
  badge: string;
}> = {
  announcement: {
    container: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800',
    icon: '📢',
    badge: 'bg-blue-500 text-white'
  },
  warning: {
    container: 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500',
    icon: '⚠️',
    badge: 'bg-red-500 text-white'
  },
  update: {
    container: 'bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20',
    icon: '🆙',
    badge: 'bg-green-500 text-white'
  },
  text: {
    container: 'bg-slate-100 dark:bg-slate-800',
    icon: '💬',
    badge: 'bg-sky-500 text-white'
  }
};

export const AdminMessageBubble: React.FC<AdminMessageBubbleProps> = ({
  content,
  messageType,
  title,
  sentAt,
  isRead,
  onOpen
}) => {
  const styles = messageTypeStyles[messageType] || messageTypeStyles.text;

  const formatTime = (date: string) => {
    return new Date(date).toLocaleString([], { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div 
      className={`p-4 rounded-xl ${styles.container} mb-3 cursor-pointer hover:opacity-90 transition-opacity`}
      onClick={onOpen}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
          A
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900 dark:text-white">Voxra Official</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${styles.badge}`}>
            {styles.icon} Official
          </span>
        </div>
        <div className="ml-auto text-xs text-slate-500">
          {formatTime(sentAt)}
        </div>
      </div>

      {/* Title (for announcements) */}
      {title && messageType === 'announcement' && (
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-2">
          {title}
        </h3>
      )}

      {/* Content */}
      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
        {content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200 dark:border-slate-700">
        <span className="text-xs text-slate-500">
          Official {messageType} message
        </span>
        {!isRead && (
          <span className="px-2 py-0.5 bg-sky-500 text-white text-xs rounded-full">
            New
          </span>
        )}
      </div>
    </div>
  );
};

// Component for the admin messages list in chat
interface AdminMessagesListProps {
  messages: Array<{
    id: string;
    content: string;
    message_type: MessageType;
    title: string | null;
    created_at: string;
    is_read: boolean;
  }>;
  onMessageClick?: (messageId: string) => void;
}

export const AdminMessagesList: React.FC<AdminMessagesListProps> = ({
  messages,
  onMessageClick
}) => {
  if (messages.length === 0) return null;

  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <AdminMessageBubble
          key={msg.id}
          content={msg.content}
          messageType={msg.message_type}
          title={msg.title}
          sentAt={msg.created_at}
          isRead={msg.is_read}
          onOpen={() => onMessageClick?.(msg.id)}
        />
      ))}
    </div>
  );
};
