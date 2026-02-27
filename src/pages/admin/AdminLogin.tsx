import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Hardcoded admin credentials
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'khan';

  useEffect(() => {
    // Check if already logged in
    if (sessionStorage.getItem('admin_session')) {
      navigate('/1234/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Login attempt with username:', username);

    // Simple hardcoded credential check
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      console.log('Admin login successful');
      sessionStorage.setItem('admin_session', JSON.stringify({ username: ADMIN_USERNAME }));
      navigate('/1234/admin/dashboard');
    } else {
      console.log('Invalid credentials');
      setError('Invalid username or password');
    }

    setLoading(false);
  };

  return (
    <div className="admin-root min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background orbs */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/15 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[420px] p-10 mx-4">
        <div className="bg-white/[0.04] backdrop-blur-[40px] border border-white/[0.08] rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden">
          {/* Logo & Title */}
          <div className="text-center mb-8 pt-2">
            {/* Gradient Logo Icon */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)]">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            
            {/* Gradient Title */}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-white/40 text-sm mt-1">Voxra Administration</p>
          </div>

          {/* Gradient Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent mb-8" />

          {/* Error Alert - Glass Red */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:bg-white/[0.1] focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15),0_0_20px_rgba(124,58,237,0.1)] transition-all duration-300"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-14 py-3.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:bg-white/[0.1] focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15),0_0_20px_rgba(124,58,237,0.1)] transition-all duration-300"
                />
                {/* Show/Hide Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Login Button with Gradient & Shimmer */}
            <button 
              type="submit" 
              disabled={loading}
              className="relative w-full py-3.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 border-none rounded-xl text-white font-semibold cursor-pointer transition-all duration-300 hover:shadow-[0_10px_30px_rgba(124,58,237,0.4)] hover:translate-y-[-2px] overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {/* Shimmer effect */}
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-white/25 text-xs mt-6">
          Voxra Admin Panel © 2026
        </p>
      </div>
    </div>
  );
};
