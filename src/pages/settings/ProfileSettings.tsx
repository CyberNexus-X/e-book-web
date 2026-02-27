import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { supabase } from '../../lib/supabase';
import { Avatar } from '../../components/common/Avatar';
import { canChangeUsername, validateUsername, getAvatarUrl } from '../../lib/utils';
import { uploadAvatar } from '../../lib/uploadImage';

export const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user, fetchProfile } = useAuthStore();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const usernameCheck = canChangeUsername(user.username_changed_at);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const handlePhotoUpload = async (file: File) => {
    setUploading(true);
    setShowBottomSheet(false);
    try {
      const path = await uploadAvatar(user.id, file);
      const fullUrl = getAvatarUrl(path, supabaseUrl);
      await supabase.from('users').update({ avatar_url: fullUrl }).eq('id', user.id);
      await fetchProfile(user.id);
      setSuccess('Photo updated!');
    } catch (e: any) { setError(e.message); }
    setUploading(false);
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);
    const updates: any = {};

    if (fullName !== user.full_name) updates.full_name = fullName;
    if (bio !== (user.bio || '')) {
      updates.bio = bio;
      updates.bio_updated_at = new Date().toISOString();
    }
    if (username !== user.username) {
      if (!usernameCheck.can) { setError(`Username can be changed after ${usernameCheck.daysLeft} days`); setSaving(false); return; }
      const err = validateUsername(username);
      if (err) { setError(err); setSaving(false); return; }
      const { data: existing } = await supabase.from('users').select('id').eq('username', username).neq('id', user.id).maybeSingle();
      if (existing) { setError('Username already taken'); setSaving(false); return; }
      updates.username = username;
      updates.username_changed_at = new Date().toISOString();
    }

    if (Object.keys(updates).length === 0) { setSaving(false); return; }
    const { error: updateErr } = await supabase.from('users').update(updates).eq('id', user.id);
    if (updateErr) { setError(updateErr.message); } else {
      setSuccess('Profile updated!');
      await fetchProfile(user.id);
    }
    setSaving(false);
  };

  return (
    <div className="glass-background" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="top-bar" style={{ background: 'transparent', borderBottom: 'none', padding: '12px 16px' }}>
        <button 
          onClick={() => navigate('/settings')} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}
        >
          ←
        </button>
        <h3 style={{ fontWeight: 700, fontSize: 20, flex: 1, color: 'white', textAlign: 'center', marginRight: 40 }}>Edit Profile</h3>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px' }} className="smooth-scroll">
        {/* Avatar Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32, marginTop: 16 }}>
          <div 
            className="avatar-upload" 
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => setShowBottomSheet(true)}
          >
            {uploading ? (
              <div className="avatar-upload-ring" style={{ width: 120, height: 120, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="loader" style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
              </div>
            ) : (
              <Avatar src={user.avatar_url} name={user.full_name} size={120} />
            )}
            <div className="avatar-upload-overlay">
              📷
            </div>
            {user.is_online && (
              <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16, background: '#22c55e', borderRadius: '50%', border: '3px solid white' }} />
            )}
          </div>
          <input type="file" ref={fileRef} accept="image/*" hidden onChange={(e) => { if (e.target.files?.[0]) handlePhotoUpload(e.target.files[0]); }} />
        </div>

        {/* Messages/Status Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <div className="stat-card" style={{ flex: 1 }}>
            <span className="stat-card-value">24</span>
            <span className="stat-card-label">Messages</span>
          </div>
          <div className="stat-card" style={{ flex: 1 }}>
            <span className="stat-card-value">3</span>
            <span className="stat-card-label">Statuses</span>
          </div>
          <div className="stat-card" style={{ flex: 1 }}>
            <span className="stat-card-value">Feb '26</span>
            <span className="stat-card-label">Member Since</span>
          </div>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.2)', 
            backdropFilter: 'blur(10px)',
            color: '#ef4444', 
            borderRadius: 12, 
            padding: '14px 18px', 
            marginBottom: 16, 
            fontSize: 14,
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{ 
            background: 'rgba(34, 197, 94, 0.2)', 
            backdropFilter: 'blur(10px)',
            color: '#22c55e', 
            borderRadius: 12, 
            padding: '14px 18px', 
            marginBottom: 16, 
            fontSize: 14,
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            {success}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'white' }}>Full Name</label>
            <input 
              className="glass-input" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              placeholder="Your full name"
            />
          </div>

          {/* Username */}
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'white' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontWeight: 600 }}>@</span>
              <input 
                className="glass-input" 
                value={username} 
                onChange={(e) => setUsername(e.target.value.toLowerCase())} 
                maxLength={20}
                placeholder="username"
                style={{ paddingLeft: 36 }}
              />
            </div>
            {!usernameCheck.can && (
              <div style={{ 
                marginTop: 8, 
                padding: '10px 14px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 10,
                fontSize: 12,
                color: '#f59e0b'
              }}>
                ⚠️ Username can be changed in {usernameCheck.daysLeft} days
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'white' }}>Bio</label>
            <textarea
              className="glass-input"
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 150))}
              placeholder="Tell us about yourself... 😊"
              maxLength={150}
              rows={3}
              style={{ resize: 'none', fontFamily: 'inherit', minHeight: 100 }}
            />
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'right', marginTop: 6 }}>{bio.length}/150</p>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'white' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <input 
                className="glass-input" 
                value={user.email} 
                disabled 
                style={{ opacity: 0.6, paddingLeft: 44, cursor: 'not-allowed' }}
              />
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔒</span>
            </div>
          </div>

          <button 
            className="glass-btn-primary" 
            onClick={handleSave} 
            disabled={saving}
            style={{ marginTop: 8 }}
          >
            {saving ? '⏳ Saving…' : '💾 Save Changes'}
          </button>
        </div>
      </div>

      {/* Bottom Sheet for Avatar Options */}
      {showBottomSheet && (
        <div className="glass-overlay" onClick={() => setShowBottomSheet(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" />
            
            <div 
              className="bottom-sheet-item"
              onClick={() => fileRef.current?.click()}
            >
              <span style={{ fontSize: 24 }}>📷</span>
              <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-text)' }}>Take Photo</span>
            </div>
            
            <div 
              className="bottom-sheet-item"
              onClick={() => fileRef.current?.click()}
            >
              <span style={{ fontSize: 24 }}>🖼️</span>
              <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-text)' }}>Choose from Gallery</span>
            </div>
            
            {user.avatar_url && (
              <div 
                className="bottom-sheet-item"
                onClick={async () => {
                  setShowBottomSheet(false);
                  await supabase.from('users').update({ avatar_url: null }).eq('id', user.id);
                  await fetchProfile(user.id);
                  setSuccess('Photo removed!');
                }}
              >
                <span style={{ fontSize: 24 }}>❌</span>
                <span style={{ fontSize: 16, fontWeight: 500, color: '#ef4444' }}>Remove Photo</span>
              </div>
            )}
            
            <div 
              className="bottom-sheet-item"
              onClick={() => setShowBottomSheet(false)}
            >
              <span style={{ fontSize: 24 }}>✕</span>
              <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-text-muted)' }}>Cancel</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
