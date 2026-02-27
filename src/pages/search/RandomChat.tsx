import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRandomChat } from '../../hooks/useRandomChat';
import { useAuthStore } from '../../store/useAuthStore';
import { formatMessageTime } from '../../lib/utils';

export const RandomChat: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { state, messages, partnerUsername, findMatch, disconnect, sendMessage, reset } = useRandomChat();
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--color-bg)' }}>
      {/* Header */}
      <div className="top-bar" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => { reset(); navigate('/search'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--color-text-muted)' }}>←</button>
          <span style={{ fontWeight: 700, fontSize: 16 }}>🎲 Random Chat</span>
        </div>
        {state === 'connected' && (
          <button className="btn-danger" style={{ padding: '6px 14px', fontSize: 13 }} onClick={disconnect}>
            Disconnect
          </button>
        )}
      </div>

      {/* Idle State */}
      {state === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40 }}>
          <span style={{ fontSize: 64 }}>🎲</span>
          <h3 style={{ fontWeight: 700, fontSize: 20 }}>Random Chat</h3>
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', fontSize: 14 }}>Chat with a random stranger. Text and emojis only.</p>
          <button className="btn-primary" style={{ maxWidth: 240, marginTop: 8 }} onClick={findMatch}>
            🔍 Find Someone
          </button>
        </div>
      )}

      {/* Waiting State */}
      {state === 'waiting' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="pulse-dot" style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-primary)' }} />
            <span className="pulse-dot" style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-primary)' }} />
            <span className="pulse-dot" style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--color-primary)' }} />
          </div>
          <h3 style={{ fontWeight: 600, fontSize: 17 }}>Looking for someone to chat with…</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>This may take a moment.</p>
          <button className="btn-ghost" style={{ marginTop: 8 }} onClick={() => { reset(); }}>
            Cancel
          </button>
        </div>
      )}

      {/* Connected State */}
      {state === 'connected' && (
        <>
          {/* Show usernames */}
          <div style={{ textAlign: 'center', padding: '10px 16px', background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)', fontSize: 14 }}>
            <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>@{user?.username}</span>
            <span style={{ margin: '0 10px', color: 'var(--color-text-muted)' }}>↔</span>
            <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>@{partnerUsername}</span>
          </div>
          {/* System message */}
          <div style={{ textAlign: 'center', padding: '12px 16px' }}>
            <span style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
              Connected successfully, now chat 🎉
            </span>
          </div>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {messages.map((msg) => {
              const isMine = msg.sender_id === user?.id;
              return (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
                  <div className={isMine ? 'bubble-sent' : 'bubble-recv'}>{msg.content}</div>
                  <span style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 1 }}>{formatMessageTime(msg.created_at)}</span>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
          {/* Input */}
          <div style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: '10px 12px', display: 'flex', gap: 8 }}>
            <input
              className="input-field"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
              placeholder="Type a message…"
              style={{ flex: 1, borderRadius: 20, padding: '10px 16px' }}
            />
            <button onClick={handleSend} disabled={!text.trim()} style={{
              background: text.trim() ? 'var(--color-primary)' : 'var(--color-border)',
              color: 'white', border: 'none', borderRadius: '50%', width: 40, height: 40,
              cursor: text.trim() ? 'pointer' : 'default', fontSize: 16, flexShrink: 0,
            }}>➤</button>
          </div>
        </>
      )}

      {/* Ended State */}
      {state === 'ended' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40 }}>
          <span style={{ fontSize: 48 }}>👋</span>
          <h3 style={{ fontWeight: 600 }}>User disconnected</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>Start a new chat?</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn-ghost" onClick={() => { reset(); navigate('/search'); }}>Back to Search</button>
            <button className="btn-primary" style={{ width: 'auto' }} onClick={() => { reset(); findMatch(); }}>🔍 Find New</button>
          </div>
        </div>
      )}
    </div>
  );
};
