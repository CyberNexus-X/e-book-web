import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Avatar } from '../../components/common/Avatar';
import { formatMessageTime, truncateText } from '../../lib/utils';
import { Loader } from '../../components/common/Loader';
import { AdminChatEntry } from '../../components/chat/AdminChatEntry';
import type { User } from '../../lib/supabase';

export const Home: React.FC = () => {
  const { user } = useAuthStore();
  const { conversations, fetchConversations, loadingConversations, getOrCreateConversation } = useChatStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [userResults, setUserResults] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (user) fetchConversations(user.id);
    const interval = setInterval(() => { if (user) fetchConversations(user.id); }, 10000);
    return () => clearInterval(interval);
  }, [user?.id]);

  useEffect(() => {
    if (!search.trim()) { setUserResults([]); return; }
    const timer = setTimeout(async () => {
      setSearching(true);
      const { data } = await supabase.from('users').select('*').ilike('username', `%${search}%`).neq('id', user?.id || '').limit(8);
      setUserResults((data as User[]) || []);
      setSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const openChat = async (otherId: string) => {
    if (!user) return;
    const convId = await getOrCreateConversation(user.id, otherId);
    navigate(`/chat/${convId}`);
  };

  const filtered = conversations.filter((c) => {
    const name = c.other_user?.full_name?.toLowerCase() || '';
    const uname = c.other_user?.username?.toLowerCase() || '';
    return name.includes(search.toLowerCase()) || uname.includes(search.toLowerCase());
  });

  return (
    <div className="glass-background" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 10px', background: 'transparent' }}>
        <h2 style={{ fontWeight: 800, fontSize: 28, marginBottom: 16, color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>Chats</h2>
        <div className="search-bar" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search chats or people…" 
            style={{ color: 'white' }}
          />
          {search && (
            <button 
              onClick={() => setSearch('')} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', fontSize: 16 }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }} className="smooth-scroll">
        {/* User search results */}
        {search && userResults.length > 0 && (
          <div style={{ padding: '0 8px' }}>
            <p style={{ padding: '12px 8px 4px', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1 }}>People</p>
            {searching && <div style={{ padding: '8px 16px' }}><Loader size={18} /></div>}
            {userResults.map((u) => (
              <div 
                key={u.id} 
                className="conv-item" 
                onClick={() => openChat(u.id)}
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  margin: '4px 8px',
                  border: 'none'
                }}
              >
                <div className="avatar-glow">
                  <Avatar src={u.avatar_url} name={u.full_name} size={44} online={u.is_online} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 15, color: 'white' }}>{u.full_name}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>@{u.username}</p>
                </div>
                {u.is_online && (
                  <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 600, background: 'rgba(34,197,94,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
                    Online
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Conversations */}
        {search && <p style={{ padding: '12px 16px 4px', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1 }}>Chats</p>}
        
        {/* Admin Chat Entry */}
        {!search && <AdminChatEntry />}
        
        {loadingConversations && !conversations.length ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
            <div className="loader" style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.2)', borderTopColor: 'white', borderRadius: '50%' }} />
          </div>
        ) : filtered.length === 0 && !search ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', gap: 12 }}>
            <span style={{ fontSize: 56, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>💬</span>
            <p style={{ fontWeight: 600, color: 'white', fontSize: 18 }}>No chats yet</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>Search for people above or try Random Chat in Search tab.</p>
          </div>
        ) : (
          filtered.map((conv) => (
            <div 
              key={conv.id} 
              className="conv-item" 
              onClick={() => navigate(`/chat/${conv.id}`)}
              style={{ 
                background: 'rgba(255,255,255,0.08)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                margin: '4px 12px',
                border: 'none',
                transition: 'all 0.2s'
              }}
            >
              <div className="avatar-glow">
                <Avatar src={conv.other_user?.avatar_url} name={conv.other_user?.full_name || '?'} size={48} online={conv.other_user?.is_online} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ fontWeight: 600, fontSize: 15, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.other_user?.full_name}
                  </p>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', flexShrink: 0, marginLeft: 8 }}>
                    {formatMessageTime(conv.last_message_at)}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {conv.last_message ? truncateText(conv.last_message, 40) : 'Start a conversation…'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
