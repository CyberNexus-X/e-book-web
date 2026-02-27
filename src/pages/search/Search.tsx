import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { User } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';
import { Avatar } from '../../components/common/Avatar';
import { Loader } from '../../components/common/Loader';

export const Search: React.FC = () => {
  const { user } = useAuthStore();
  const { getOrCreateConversation } = useChatStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [randomChatEnabled, setRandomChatEnabled] = useState(true);

  // Check if random chat is enabled
  useEffect(() => {
    const checkRandomChat = async () => {
      const { data } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'random_chat_enabled')
        .single();
      
      if (data && data.value === 'false') {
        setRandomChatEnabled(false);
      }
    };
    checkRandomChat();
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      const { data } = await supabase
        .from('users')
        .select('*')
        .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
        .neq('id', user?.id || '')
        .limit(20);
      setResults((data as User[]) || []);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const startChat = async (otherId: string) => {
    if (!user) {
      console.error('User not logged in');
      return;
    }
    
    console.log('Starting chat with user:', otherId);
    
    try {
      const convId = await getOrCreateConversation(user.id, otherId);
      console.log('Conversation ID:', convId);
      
      // Close modal first
      setSelectedUser(null);
      
      // Navigate to chat
      navigate(`/chat/${convId}`);
    } catch (err: any) {
      console.error('Error starting chat:', err);
      alert('Failed to start chat: ' + err.message);
    }
  };

  return (
    <div className="glass-background" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: 16, background: 'transparent' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16, color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>Search</h2>

        {/* Random Chat Entry */}
        {randomChatEnabled && (
        <div
          onClick={() => navigate('/random-chat')}
          style={{
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.8), rgba(2, 132, 199, 0.9))',
            backdropFilter: 'blur(10px)',
            color: 'white',
            borderRadius: 16,
            padding: '20px 24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 16,
            boxShadow: '0 8px 32px rgba(14, 165, 233, 0.4)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <span style={{ fontSize: 36 }}>🎲</span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 18 }}>Random Chat</p>
            <p style={{ fontSize: 13, opacity: 0.85 }}>Chat with a random stranger!</p>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 24 }}>→</span>
        </div>
        )}

        <div className="search-bar" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search by username or name…" 
            style={{ color: 'white' }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }} className="smooth-scroll">
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
            <div className="loader" style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.2)', borderTopColor: 'white', borderRadius: '50%' }} />
          </div>
        )}
        
        {results.map((u) => (
          <div 
            key={u.id} 
            className="conv-item" 
            onClick={() => setSelectedUser(u)}
            style={{ 
              background: 'rgba(255,255,255,0.08)', 
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              margin: '4px 12px',
              border: 'none'
            }}
          >
            <div className="avatar-glow">
              <Avatar src={u.avatar_url} name={u.full_name} size={48} online={u.is_online} />
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
        
        {!loading && query && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.6)' }}>
            <span style={{ fontSize: 48 }}>🔍</span>
            <p style={{ marginTop: 12, fontSize: 16 }}>No users found for "{query}"</p>
          </div>
        )}
      </div>

      {/* User Profile Preview Modal */}
      {selectedUser && (
        <div className="glass-overlay" onClick={() => setSelectedUser(null)}>
          <div className="glass-card" style={{ width: '90%', maxWidth: 360, padding: 24, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div className="avatar-glow" style={{ display: 'inline-block', marginBottom: 8 }}>
              <Avatar src={selectedUser.avatar_url} name={selectedUser.full_name} size={80} online={selectedUser.is_online} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginTop: 12, color: 'var(--color-text)' }}>{selectedUser.full_name}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>@{selectedUser.username}</p>
            {selectedUser.is_online && (
              <p style={{ color: '#22c55e', fontSize: 13, marginTop: 4 }}>🟢 Online now</p>
            )}
            {selectedUser.profile_public && selectedUser.created_at && (
              <p style={{ color: 'var(--color-text-muted)', fontSize: 12, marginTop: 8 }}>
                Joined {new Date(selectedUser.created_at).toLocaleDateString()}
              </p>
            )}
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button 
                className="glass-btn" 
                onClick={() => setSelectedUser(null)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button 
                className="glass-btn-primary" 
                onClick={() => startChat(selectedUser.id)}
                style={{ flex: 1 }}
              >
                💬 Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
