import React, { useState, useEffect, useCallback } from 'react';
import { supabase, type Status as StatusType } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { Avatar } from '../../components/common/Avatar';
import { Loader } from '../../components/common/Loader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const DURATION_OPTIONS = [
  { value: 6, label: '6 Hours' },
  { value: 12, label: '12 Hours' },
  { value: 24, label: '24 Hours' },
  { value: 48, label: '2 Days' },
  { value: 168, label: '1 Week' },
];

const BACKGROUNDS = [
  { value: 'white', color: '#ffffff' },
  { value: 'black', color: '#000000' },
  { value: 'red', color: '#fee2e2' },
  { value: 'blue', color: '#dbeafe' },
  { value: 'green', color: '#dcfce7' },
  { value: 'yellow', color: '#fef9c3' },
  { value: 'purple', color: '#f3e8ff' },
  { value: 'pink', color: '#fce7f3' },
];

const GRADIENTS = [
  { value: '', label: 'Solid' },
  { value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Purple' },
  { value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'Sunset' },
  { value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'Ocean' },
  { value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'Mint' },
  { value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', label: 'Warm' },
];

export const Status: React.FC = () => {
  const { user } = useAuthStore();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const [composeText, setComposeText] = useState('');
  const [visibility, setVisibility] = useState<'anyone' | 'contacts'>('anyone');
  const [durationHours, setDurationHours] = useState(24);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [textColor, setTextColor] = useState('black');
  const [fontSize, setFontSize] = useState('medium');
  const [gradient, setGradient] = useState('');
  const [posting, setPosting] = useState(false);
  const [viewingStatus, setViewingStatus] = useState<StatusType | null>(null);
  const [statusUpdatesEnabled, setStatusUpdatesEnabled] = useState(true);

  // Check if status updates are enabled
  useEffect(() => {
    const checkStatusUpdates = async () => {
      const { data } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'status_updates_enabled')
        .single();
      
      if (data && data.value === 'false') {
        setStatusUpdatesEnabled(false);
      }
    };
    checkStatusUpdates();
  }, []);

  const fetchStatuses = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('statuses')
        .select('*, user:users(id, full_name, username, avatar_url)')
        .eq('is_deleted', false)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStatuses(data || []);
    } catch (err) {
      console.error('Error fetching statuses:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchStatuses();
  }, [user, fetchStatuses]);

  const myStatuses = statuses.filter((s) => s.user_id === user?.id);
  const otherStatuses = statuses.filter((s) => s.user_id !== user?.id);

  const groupedByUser = otherStatuses.reduce<Record<string, { user: any; statuses: Status[] }>>((acc, s) => {
    if (!acc[s.user_id]) acc[s.user_id] = { user: (s as any).user, statuses: [] };
    acc[s.user_id].statuses.push(s);
    return acc;
  }, {});

  const handlePost = async () => {
    if (!composeText.trim() || !user) return;
    setPosting(true);
    
    const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase.from('statuses').insert({
      user_id: user.id,
      content: composeText.trim(),
      visibility,
      background_color: backgroundColor,
      text_color: textColor,
      font_size: fontSize,
      gradient: gradient || null,
      duration_hours: durationHours,
      expires_at: expiresAt,
    }).select('*, user:users(id, full_name, username, avatar_url)').single();

    if (!error && data) {
      setStatuses(prev => [data as Status, ...prev]);
    }
    
    setComposeText('');
    setShowCompose(false);
    setPosting(false);
  };

  const deleteStatus = async (statusId: string) => {
    try {
      await supabase.from('statuses').update({ is_deleted: true }).eq('id', statusId);
      setStatuses(prev => prev.filter(s => s.id !== statusId));
    } catch (err) {
      console.error('Error deleting status:', err);
    }
  };

  // Auto-dismiss status viewer
  useEffect(() => {
    if (!viewingStatus) return;
    const timer = setTimeout(() => setViewingStatus(null), 5000);
    return () => clearTimeout(timer);
  }, [viewingStatus]);

  const getStatusStyle = (status: StatusType): React.CSSProperties => {
    if (status.gradient) {
      return { background: status.gradient };
    }
    return { backgroundColor: status.background_color || 'white' };
  };

  const getTextStyle = (status: StatusType): React.CSSProperties => ({
    color: status.text_color || 'black',
    fontSize: status.font_size === 'small' ? '16px' : status.font_size === 'large' ? '28px' : '22px',
    fontStyle: status.font_style || 'normal',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--color-bg)' }}>
      {/* Header */}
      <div style={{ padding: 16, background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Status</h2>
          {statusUpdatesEnabled && (
          <button className="btn-primary" style={{ width: 'auto', padding: '8px 16px', fontSize: 14 }} onClick={() => setShowCompose(true)}>
            + My Status
          </button>
          )}
        </div>
      </div>

      {/* Status Stories Bar */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}><Loader /></div>
        ) : (
          <>
            {/* Stories Section */}
            {(myStatuses.length > 0 || Object.keys(groupedByUser).length > 0) && (
              <div style={{ padding: '16px 0 12px', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 16px' }}>
                  {/* My Status */}
                  <div
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', minWidth: 60 }}
                    onClick={() => { if (myStatuses[0]) setViewingStatus(myStatuses[0]); else setShowCompose(true); }}
                  >
                    <div style={{ position: 'relative' }}>
                      <Avatar src={user?.avatar_url} name={user?.full_name || ''} size={52} />
                      {myStatuses.length === 0 && (
                        <span style={{
                          position: 'absolute', bottom: -2, right: -2,
                          width: 20, height: 20, borderRadius: '50%',
                          background: 'var(--color-primary)', color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 14, fontWeight: 700, border: '2px solid var(--color-surface)',
                        }}>+</span>
                      )}
                      {myStatuses.length > 0 && (
                        <div style={{
                          position: 'absolute', inset: -2, borderRadius: '50%',
                          border: '3px solid var(--color-primary)',
                        }} />
                      )}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 500 }}>My Status</span>
                  </div>

                  {/* Other Users */}
                  {Object.entries(groupedByUser).map(([uid, data]) => (
                    <div
                      key={uid}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', minWidth: 60 }}
                      onClick={() => setViewingStatus(data.statuses[0])}
                    >
                      <div style={{ border: '2px solid var(--color-primary)', borderRadius: '50%', padding: 2 }}>
                        <Avatar src={data.user?.avatar_url} name={data.user?.full_name || ''} size={48} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 500, maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {data.user?.full_name?.split(' ')[0] || 'User'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status List */}
            <div style={{ padding: 16 }}>
              {statuses.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
                  <span style={{ fontSize: 48 }}>📊</span>
                  <p style={{ marginTop: 8, fontWeight: 500 }}>No statuses yet</p>
                  <p style={{ fontSize: 13, marginTop: 4 }}>Post a status to share with your contacts!</p>
                </div>
              )}

              {/* My Statuses */}
              {myStatuses.length > 0 && (
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>My Status</p>
                  {myStatuses.map((s) => (
                    <div key={s.id} className="card" style={{ padding: '12px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ 
                        ...getStatusStyle(s), 
                        width: 60, height: 60, borderRadius: 8, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <span style={{ fontSize: 24 }}>{s.emoji_overlay || '📝'}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 15, ...getTextStyle(s) }}>{s.content}</p>
                        <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>
                          {dayjs(s.created_at).fromNow()} · {s.visibility === 'anyone' ? '🌐 Everyone' : '👥 Contacts'}
                        </p>
                      </div>
                      <button onClick={() => deleteStatus(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16 }}>🗑</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Other Statuses */}
              {otherStatuses.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>Recent Updates</p>
                  {otherStatuses.map((s) => (
                    <div key={s.id} className="card" style={{ padding: '12px 16px', marginBottom: 8, cursor: 'pointer' }} onClick={() => setViewingStatus(s)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <Avatar src={(s as any).user?.avatar_url} name={(s as any).user?.full_name || ''} size={32} />
                        <div>
                          <p style={{ fontWeight: 600, fontSize: 14 }}>{(s as any).user?.full_name}</p>
                          <p style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{dayjs(s.created_at).fromNow()}</p>
                        </div>
                      </div>
                      <div style={{ ...getStatusStyle(s), padding: 12, borderRadius: 8, marginTop: 8 }}>
                        <p style={{ fontSize: 15, ...getTextStyle(s) }}>{s.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="overlay" onClick={() => setShowCompose(false)}>
          <div 
            className="card" 
            style={{ width: '95%', maxWidth: 420, padding: 0, maxHeight: '90vh', overflow: 'auto' }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: 16, borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontWeight: 700, fontSize: 18 }}>Post Status</h3>
              <button onClick={() => setShowCompose(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ padding: 16 }}>
              {/* Preview */}
              <div 
                style={{ 
                  ...(gradient ? { background: gradient } : { backgroundColor: BACKGROUNDS.find(b => b.value === backgroundColor)?.color || 'white' }),
                  padding: 24, 
                  borderRadius: 12, 
                  marginBottom: 16,
                  minHeight: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p style={{ color: textColor, fontSize: fontSize === 'small' ? 16 : fontSize === 'large' ? 28 : 22, textAlign: 'center' }}>
                  {composeText || 'Your status preview...'}
                </p>
              </div>

              {/* Content */}
              <textarea
                className="input-field"
                value={composeText}
                onChange={(e) => setComposeText(e.target.value.slice(0, 280))}
                placeholder="What's on your mind? 💭"
                maxLength={280}
                rows={3}
                style={{ resize: 'none', width: '100%', fontFamily: 'inherit' }}
              />
              <p style={{ fontSize: 11, color: 'var(--color-text-muted)', textAlign: 'right', marginTop: 4, marginBottom: 16 }}>{composeText.length}/280</p>

              {/* Background */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: 'block' }}>Background</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {GRADIENTS.map(g => (
                    <button
                      key={g.label}
                      onClick={() => { setGradient(g.value); if (!g.value) setBackgroundColor('white'); }}
                      style={{
                        width: 40, height: 40, borderRadius: 8, 
                        border: gradient === g.value ? '3px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: g.value || BACKGROUNDS[0].color,
                        cursor: 'pointer',
                      }}
                      title={g.label}
                    />
                  ))}
                </div>
              </div>

              {/* Text Color */}
              {!gradient && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: 'block' }}>Text Color</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['black', 'white', '#ef4444', '#3b82f6', '#22c55e', '#eab308'].map(c => (
                      <button
                        key={c}
                        onClick={() => setTextColor(c)}
                        style={{
                          width: 32, height: 32, borderRadius: '50%', 
                          border: textColor === c ? '3px solid var(--color-primary)' : '1px solid var(--color-border)',
                          background: c, cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Font Size */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: 'block' }}>Text Size</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['small', 'medium', 'large'].map(size => (
                    <button
                      key={size}
                      className="btn-ghost"
                      onClick={() => setFontSize(size)}
                      style={{ flex: 1, fontSize: 13, background: fontSize === size ? 'var(--color-primary-light)' : undefined, textTransform: 'capitalize' }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibility */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: 'block' }}>Visibility</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-ghost" onClick={() => setVisibility('anyone')}
                    style={{ flex: 1, fontSize: 13, background: visibility === 'anyone' ? 'var(--color-primary-light)' : 'transparent', color: visibility === 'anyone' ? 'var(--color-primary-dark)' : undefined }}>
                    🌐 Everyone
                  </button>
                  <button className="btn-ghost" onClick={() => setVisibility('contacts')}
                    style={{ flex: 1, fontSize: 13, background: visibility === 'contacts' ? 'var(--color-primary-light)' : 'transparent', color: visibility === 'contacts' ? 'var(--color-primary-dark)' : undefined }}>
                    👥 Contacts
                  </button>
                </div>
              </div>

              {/* Duration */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, display: 'block' }}>Expires After</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {DURATION_OPTIONS.map(d => (
                    <button
                      key={d.value}
                      className="btn-ghost"
                      onClick={() => setDurationHours(d.value)}
                      style={{ flex: 1, minWidth: 70, fontSize: 12, background: durationHours === d.value ? 'var(--color-primary-light)' : undefined }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: 16, borderTop: '1px solid var(--color-border)', display: 'flex', gap: 8 }}>
              <button className="btn-ghost" onClick={() => setShowCompose(false)} style={{ flex: 1 }}>Cancel</button>
              <button className="btn-primary" onClick={handlePost} disabled={posting || !composeText.trim()} style={{ flex: 1 }}>
                {posting ? '⏳ Posting…' : '📤 Post Status'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Status Viewer */}
      {viewingStatus && (
        <div className="status-viewer" onClick={() => setViewingStatus(null)}>
          <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar src={(viewingStatus as any).user?.avatar_url} name={(viewingStatus as any).user?.full_name || user?.full_name || ''} size={36} />
            <div>
              <p style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>{(viewingStatus as any).user?.full_name || user?.full_name}</p>
              <p style={{ color: '#aaa', fontSize: 12 }}>{dayjs(viewingStatus.created_at).fromNow()}</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#333' }}>
            <div style={{ height: '100%', background: 'var(--color-primary)', animation: 'progress-fill 5s linear forwards' }} />
          </div>
          <style>{`@keyframes progress-fill { from { width: 0; } to { width: 100%; } }`}</style>
          
          {/* Status Content */}
          <div style={{ 
            ...getStatusStyle(viewingStatus),
            padding: 40, 
            borderRadius: 16,
            maxWidth: '80%',
            textAlign: 'center',
          }}>
            <p style={{ ...getTextStyle(viewingStatus), fontSize: viewingStatus.font_size === 'small' ? 20 : viewingStatus.font_size === 'large' ? 36 : 28 }}>
              {viewingStatus.content}
            </p>
          </div>
          
          <p style={{ position: 'absolute', bottom: 30, color: '#888', fontSize: 13 }}>Tap to dismiss</p>
        </div>
      )}
    </div>
  );
};
