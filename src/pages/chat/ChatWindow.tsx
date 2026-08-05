import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { User } from '../../lib/supabase';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useRealtime } from '../../hooks/useRealtime';
import { Avatar } from '../../components/common/Avatar';
import { Loader } from '../../components/common/Loader';
import { formatMessageTime, formatLastSeen } from '../../lib/utils';
import { uploadMessageImage } from '../../lib/uploadImage';

export const ChatWindow: React.FC = () => {
  const { id: conversationId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { messages, fetchMessages, loadingMessages, markAsRead } = useChatStore();
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useRealtime(conversationId || null);

  const convMessages = conversationId ? (messages[conversationId] || []) : [];

  // Check if current user is banned
  useEffect(() => {
    const checkBanStatus = async () => {
      if (!user) return;
      const { data } = await supabase.from('users').select('is_banned').eq('id', user.id).single();
      if (data) {
        setIsBanned(data.is_banned || false);
      }
    };
    checkBanStatus();
  }, [user]);

  useEffect(() => {
    if (!conversationId) return;
    fetchMessages(conversationId);
    // Fetch other user info
    supabase.from('conversations').select('participant_1, participant_2').eq('id', conversationId).single().then(({ data }) => {
      if (data) {
        const otherId = data.participant_1 === user?.id ? data.participant_2 : data.participant_1;
        supabase.from('users').select('*').eq('id', otherId).single().then(({ data: u }) => {
          if (u) setOtherUser(u as User);
        });
      }
    });
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convMessages.length]);

  useEffect(() => {
    if (conversationId && user) markAsRead(conversationId, user.id);
  }, [conversationId, convMessages.length]);

  const sendText = async () => {
    if (!text.trim() || !user || !conversationId) return;
    
    // Check if user is banned before sending
    if (isBanned) {
      alert('Aapka account restricted hai. Message send nahi kar sakte.');
      return;
    }
    
    setSending(true);
    const content = text.trim();
    setText('');
    await supabase.from('messages').insert({ conversation_id: conversationId, sender_id: user.id, type: 'text', content });
    await supabase.from('conversations').update({ last_message: content, last_message_at: new Date().toISOString() }).eq('id', conversationId);
    setSending(false);
    inputRef.current?.focus();
  };

  const sendImage = async (file: File) => {
    if (!user || !conversationId) return;
    
    // Check if user is banned before sending
    if (isBanned) {
      alert('Aapka account restricted hai. Message send nahi kar sakte.');
      return;
    }
    
    setSending(true);
    try {
      const url = await uploadMessageImage(conversationId, file);
      await supabase.from('messages').insert({ conversation_id: conversationId, sender_id: user.id, type: 'image', content: url });
      await supabase.from('conversations').update({ last_message: '📷 Image', last_message_at: new Date().toISOString() }).eq('id', conversationId);
    } catch (e) { console.error(e); }
    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); } };

  return (
    <div className="glass-background" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="top-bar" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button 
          onClick={() => navigate('/home')} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, color: 'white', display: 'flex', alignItems: 'center' }}
        >
          ←
        </button>
        {otherUser && (
          <>
            <div className="avatar-glow">
              <Avatar src={otherUser.avatar_url} name={otherUser.full_name} size={38} online={otherUser.is_online} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 600, fontSize: 16, color: 'white' }}>{otherUser.full_name}</p>
              <p style={{ fontSize: 12, color: otherUser.is_online ? '#22c55e' : 'rgba(255,255,255,0.6)' }}>
                {otherUser.is_online ? 'Online' : `Last seen ${formatLastSeen(otherUser.last_seen)}`}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8, background: 'transparent' }} className="smooth-scroll">
        {loadingMessages ? (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
            <div className="loader" style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.2)', borderTopColor: 'white', borderRadius: '50%' }} />
          </div>
        ) : convMessages.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 60, color: 'rgba(255,255,255,0.6)' }}>
            <span style={{ fontSize: 56 }}>👋</span>
            <p style={{ marginTop: 12, fontWeight: 500, fontSize: 16, color: 'white' }}>Say hello!</p>
          </div>
        ) : (
          convMessages.map((msg) => {
            const isMine = msg.sender_id === user?.id;
            return (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
                <div className={isMine ? 'bubble-glass-sent' : 'bubble-glass-recv'}>
                  {msg.type === 'image' ? (
                    <img src={msg.content} alt="Shared image" className="msg-image" />
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4, padding: '0 4px' }}>
                  {formatMessageTime(msg.created_at)}
                  {isMine && <span style={{ marginLeft: 4 }}>{msg.is_read ? '✓✓' : '✓'}</span>}
                </span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Message Input - Show ban message if banned */}
      {isBanned ? (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(239,68,68,0.3)', padding: '16px', textAlign: 'center' }}>
          <p style={{ color: '#ef4444', fontWeight: 600 }}>🚫 Aapka account restricted hai</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 4 }}>Message send nahi kar sakte.</p>
        </div>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button 
            onClick={() => setShowEmoji(!showEmoji)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, padding: 8, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            😊
          </button>
          <button 
            onClick={() => fileRef.current?.click()} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'white', padding: 8, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            📎
          </button>
          <input type="file" ref={fileRef} accept="image/*" hidden onChange={(e) => { if (e.target.files?.[0]) sendImage(e.target.files[0]); e.target.value = ''; }} />
          <input
            ref={inputRef}
            className="glass-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            style={{ flex: 1, padding: '12px 16px', borderRadius: 24, background: 'rgba(255,255,255,0.1)' }}
          />
          <button 
            onClick={sendText} 
            disabled={!text.trim() || sending} 
            style={{
              background: text.trim() ? 'linear-gradient(135deg, #0ea5e9, #0284c7)' : 'rgba(255,255,255,0.1)',
              color: 'white', 
              border: 'none', 
              borderRadius: '50%',
              width: 44, 
              height: 44, 
              cursor: text.trim() ? 'pointer' : 'default',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: 18,
              transition: 'all 0.2s',
              flexShrink: 0,
              boxShadow: text.trim() ? '0 4px 12px rgba(14, 165, 233, 0.4)' : 'none'
            }}
          >
            {sending ? (
              <div className="loader" style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
            ) : (
              '➤'
            )}
          </button>
        </div>
      )}
    </div>
  );
};
