import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Button } from '../../components/admin';
import { useAppSettingsStore } from '../../store/useAppSettingsStore';
import { useToast } from '../../components/admin/Toast';

export const AdminSettings: React.FC = () => {
  const { 
    allow_registration, 
    email_verification, 
    random_chat_enabled, 
    status_updates_enabled,
    anonymous_reporting,
    auto_moderate_spam,
    loading,
    error,
    fetchSettings,
    updateSetting 
  } = useAppSettingsStore();
  const { showToast } = useToast();
  
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // Mock admin data
  const [adminData] = useState({
    name: 'Admin',
    email: 'admin@voxra.com',
  });

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleToggle = async (key: any, value: boolean) => {
    setSavingKey(key);
    try {
      await updateSetting(key, value);
      showToast('Setting saved successfully', 'success');
    } catch (err) {
      showToast('Failed to save setting', 'error');
    } finally {
      setSavingKey(null);
    }
  };

  const handleSave = () => {
    showToast('All settings saved', 'success');
  };

  const settingsList = [
    { 
      key: 'allow_registration', 
      label: 'Allow Registration', 
      desc: 'Allow new users to register',
      value: allow_registration,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    { 
      key: 'email_verification', 
      label: 'Email Verification', 
      desc: 'Require email verification for new users',
      value: email_verification,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      key: 'random_chat_enabled', 
      label: 'Random Chat', 
      desc: 'Enable random chat feature',
      value: random_chat_enabled,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    { 
      key: 'status_updates_enabled', 
      label: 'Status Updates', 
      desc: 'Enable status posts feature',
      value: status_updates_enabled,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      key: 'anonymous_reporting', 
      label: 'Anonymous Reporting', 
      desc: 'Allow anonymous bug reports',
      value: anonymous_reporting,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      )
    },
    { 
      key: 'auto_moderate_spam', 
      label: 'Auto Moderate Spam', 
      desc: 'Automatically detect and filter spam',
      value: auto_moderate_spam,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto admin-page">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-white/50 mt-1">Loading settings...</p>
        </div>
        <Card>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-white/5 rounded-xl" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto admin-page">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/50 mt-1">Manage your admin account and app settings</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {/* Admin Account */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader 
          title="Admin Account" 
          subtitle="Manage your admin profile"
        />
        <div className="space-y-6">
          <div className="flex items-center gap-5 p-4 bg-white/[0.03] rounded-xl border border-white/[0.08]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {adminData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white text-lg">{adminData.name}</p>
              <p className="text-sm text-white/50">{adminData.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
              <input
                type="text"
                defaultValue={adminData.name}
                className="w-full px-4 py-2.5 bg-white/[0.06] border border-white/[0.15] rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
              <input
                type="email"
                defaultValue={adminData.email}
                className="w-full px-4 py-2.5 bg-white/[0.06] border border-white/[0.15] rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              />
            </div>
          </div>
          
          <Button variant="glass-primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </Card>

      {/* App Settings */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader 
          title="App Settings" 
          subtitle="Configure your application"
        />
        
        <div className="space-y-1">
          {settingsList.map((item) => (
            <div 
              key={item.key}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium text-white">{item.label}</p>
                  <p className="text-sm text-white/40">{item.desc}</p>
                </div>
              </div>
              
              {/* Custom Toggle */}
              <button
                onClick={() => handleToggle(item.key, !item.value)}
                disabled={savingKey === item.key}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  item.value
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500'
                    : 'bg-white/10 border border-white/20'
                } ${savingKey === item.key ? 'opacity-70' : ''}`}
              >
                {savingKey === item.key && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    item.value ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader 
          title="Security" 
          subtitle="Security and access settings"
        />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
            <div>
              <p className="font-medium text-white">Two-Factor Authentication</p>
              <p className="text-sm text-white/40">Add an extra layer of security</p>
            </div>
            <Button variant="glass" size="sm">Enable</Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
            <div>
              <p className="font-medium text-white">Session Timeout</p>
              <p className="text-sm text-white/40">Auto logout after inactivity</p>
            </div>
            <select className="px-3 py-2 bg-white/[0.06] border border-white/[0.15] rounded-xl text-white text-sm focus:outline-none">
              <option value="15">15 minutes</option>
              <option value="30" selected>30 minutes</option>
              <option value="60">1 hour</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
};
