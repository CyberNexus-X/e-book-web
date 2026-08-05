import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';

export const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  // Danger zone state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState('');

  const getPasswordStrength = (p: string): number => {
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setSaving(true);
    
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setError(err.message);
    }
    
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/signin');
  };

  const handleDeleteAccount = async () => {
    if (deleteText !== 'DELETE') {
      setError('Type DELETE to confirm');
      return;
    }
    
    setSaving(true);
    
    try {
      // Delete user data from users table
      if (user) {
        await supabase.from('users').delete().eq('id', user.id);
      }
      
      // Delete user - in a real app this would call an edge function
      if (user) {
        await supabase.from('users').delete().eq('id', user.id);
      }
      
      navigate('/signin');
    } catch (err: any) {
      setError(err.message);
    }
    
    setSaving(false);
  };

  if (!user) return null;

  return (
    <div className="glass-background" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="top-bar" style={{ background: 'transparent', borderBottom: 'none', padding: '12px 16px' }}>
        <button 
          onClick={() => navigate('/settings')} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }}
        >
          ←
        </button>
        <h3 style={{ fontWeight: 700, fontSize: 20, flex: 1, color: 'white', textAlign: 'center', marginRight: 40 }}>Account</h3>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px' }} className="smooth-scroll">
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

        {/* Change Password */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>🔑 Change Password</p>
          
          <div className="glass-card" style={{ padding: 16 }}>
            {/* Current Password */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'white' }}>Current Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPasswords.current ? 'text' : 'password'}
                  className="glass-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <button
                  onClick={() => setShowPasswords(p => ({ ...p, current: !p.current }))}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16
                  }}
                >
                  {showPasswords.current ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'white' }}>New Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPasswords.new ? 'text' : 'password'}
                  className="glass-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  onClick={() => setShowPasswords(p => ({ ...p, new: !p.new }))}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16
                  }}
                >
                  {showPasswords.new ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {newPassword && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 4, height: 4, overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${(passwordStrength / 4) * 100}%`, 
                      height: '100%',
                      background: passwordStrength < 2 ? '#ef4444' : passwordStrength < 3 ? '#f59e0b' : '#22c55e',
                      transition: 'all 0.3s'
                    }} />
                  </div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                    Password strength: {passwordStrength < 2 ? 'Weak' : passwordStrength < 3 ? 'Fair' : passwordStrength < 4 ? 'Good' : 'Strong'}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: 8, fontSize: 14, color: 'white' }}>Confirm New Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPasswords.confirm ? 'text' : 'password'}
                  className="glass-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                <button
                  onClick={() => setShowPasswords(p => ({ ...p, confirm: !p.confirm }))}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16
                  }}
                >
                  {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button 
              className="glass-btn-primary" 
              onClick={handleChangePassword} 
              disabled={saving || !currentPassword || !newPassword || !confirmPassword}
              style={{ width: '100%' }}
            >
              {saving ? '⏳ Changing…' : '🔐 Change Password'}
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(239, 68, 68, 0.8)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>⚠️ Danger Zone</p>
          
          <div className="danger-zone">
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <button 
                className="glass-btn"
                onClick={handleLogout}
                style={{ flex: 1, color: '#ef4444' }}
              >
                🚪 Logout
              </button>
              <button 
                className="glass-btn-danger"
                onClick={() => setShowDeleteConfirm(true)}
                style={{ flex: 1 }}
              >
                🗑️ Delete Account
              </button>
            </div>
            
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              Warning: Deleting your account is permanent and cannot be undone.
            </p>
          </div>
        </div>

        {/* Delete Account Confirmation */}
        {showDeleteConfirm && (
          <div className="glass-overlay" onClick={() => setShowDeleteConfirm(false)}>
            <div className="glass-card" style={{ width: '90%', maxWidth: 360, padding: 24, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#ef4444' }}>Delete Account?</h3>
              <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 16 }}>
                This action is permanent. Type DELETE to confirm.
              </p>
              <input 
                className="glass-input"
                value={deleteText}
                onChange={(e) => setDeleteText(e.target.value)}
                placeholder="Type DELETE"
                style={{ marginBottom: 16, textAlign: 'center' }}
              />
              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  className="glass-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  className="glass-btn-danger"
                  onClick={handleDeleteAccount}
                  disabled={deleteText !== 'DELETE' || saving}
                  style={{ flex: 1 }}
                >
                  {saving ? '⏳' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};