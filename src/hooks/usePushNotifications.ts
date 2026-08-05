import { useEffect, useCallback, useRef } from 'react';
import { supabase, type Message } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
}

// Check if notifications are permitted
export function isNotificationPermitted(): boolean {
  return 'Notification' in window && Notification.permission === 'granted';
}

export function usePushNotifications(currentConversationId: string | null) {
  const { user } = useAuthStore();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Send a notification for a new message
  const sendNotification = useCallback((senderName: string, messageContent: string, conversationId: string) => {
    if (!isNotificationPermitted()) return;
    
    // Don't show notification if user is currently in that conversation
    if (currentConversationId === conversationId) return;

    const notification = new Notification(`New message from ${senderName}`, {
      body: messageContent.length > 100 ? messageContent.substring(0, 100) + '...' : messageContent,
      icon: '/vite.svg',
      badge: '/vite.svg',
      tag: conversationId, // Prevent duplicate notifications for same conversation
      requireInteraction: false,
    });

    // Handle notification click
    notification.onclick = () => {
      window.focus();
      window.location.href = `/chat/${conversationId}`;
      notification.close();
    };

    // Auto-close after 5 seconds
    setTimeout(() => notification.close(), 5000);
  }, [currentConversationId]);

  // Subscribe to new messages for push notifications
  useEffect(() => {
    if (!user) return;

    // Create a channel for listening to all new messages
    const channel = supabase
      .channel('push-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        async (payload) => {
          const newMessage = payload.new as Message;
          
          // Don't notify for our own messages
          if (newMessage.sender_id === user.id) return;
          
          // Get sender info
          const { data: senderData } = await supabase
            .from('users')
            .select('full_name')
            .eq('id', newMessage.sender_id)
            .single();
            
          const senderName = senderData?.full_name || 'Unknown User';
          
          // Send push notification
          sendNotification(senderName, newMessage.content, newMessage.conversation_id);
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, sendNotification]);

  // Request permission on first use
  useEffect(() => {
    if (user) {
      requestNotificationPermission();
    }
  }, [user]);

  return { requestNotificationPermission, isNotificationPermitted };
}
