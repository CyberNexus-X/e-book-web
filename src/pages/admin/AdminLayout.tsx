import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { AdminLogin } from './AdminLogin';
import { ToastProvider } from '../../components/admin/Toast';

const navItems = [
  { path: '/1234/admin/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: '/1234/admin/users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { path: '/1234/admin/statuses', label: 'Statuses', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { path: '/1234/admin/compose', label: 'Compose', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { path: '/1234/admin/direct', label: 'Direct', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { path: '/1234/admin/history', label: 'History', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { path: '/1234/admin/settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!sessionStorage.getItem('admin_session');
  const isLoginPage = location.pathname === '/1234/admin';
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications] = useState(3);

  // If not authenticated and on login page, show login
  if (!isAuthenticated && isLoginPage) {
    return <AdminLogin />;
  }

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/1234/admin');
    }
  }, [isAuthenticated, navigate]);

  // If not authenticated, show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session');
    navigate('/1234/admin');
  };

  // Get page title from location
  const getPageTitle = () => {
    const currentItem = navItems.find(item => location.pathname === item.path);
    return currentItem?.label || 'Admin Panel';
  };

  return (
    <ToastProvider>
    <div className="admin-root h-screen overflow-hidden flex">
      {/* Sidebar - Glass Effect */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white/[0.03] backdrop-blur-xl border-r border-white/[0.06] flex flex-col transition-all duration-300 z-50 shadow-xl ${sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'}`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            {/* Gradient Logo */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/25">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            {!sidebarCollapsed && (
              <div>
                <div className="font-bold text-white text-lg tracking-tight">Voxra</div>
                <div className="text-white/40 text-xs font-medium">Admin Panel</div>
              </div>
            )}
          </div>
        </div>

        {/* Gradient Line Separator */}
        <div className="h-px mx-4 my-3 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-violet-600/25 to-cyan-500/15 text-white border border-violet-500/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]' 
                    : 'text-white/50 hover:bg-white/[0.06] hover:text-white'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                {/* Active Left Accent Line */}
                {isActive && (
                  <span className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-gradient-to-b from-violet-500 to-cyan-500 rounded-[2px] shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
                )}
                
                <svg className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
        >
          <svg className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Bottom Section */}
        <div className="p-3 border-t border-white/[0.06] space-y-2">
          {/* Admin Avatar */}
          <div className={`flex items-center gap-3 p-3 rounded-xl ${sidebarCollapsed ? 'justify-center' : ''} hover:bg-white/[0.06] transition-colors cursor-pointer group`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-lg group-hover:shadow-violet-500/25 transition-shadow">
              A
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm truncate">Admin</div>
                <div className="text-white/40 text-xs">Administrator</div>
              </div>
            )}
          </div>
          
          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
            title={sidebarCollapsed ? 'Logout' : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={`flex-1 flex flex-col transition-all duration-300 admin-page ${
          sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'
        }`}
      >
        {/* Top Navbar - Glass Header */}
        <header className="h-16 bg-[#0d0d1a]/80 backdrop-blur-xl border-b border-white/[0.06] px-6 flex items-center justify-between sticky top-0 z-40">
          {/* Page Title */}
          <h1 className="text-xl font-semibold text-white">{getPageTitle()}</h1>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Bar - Glass Style */}
            <div className="relative hidden md:block">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 bg-white/[0.06] border border-white/[0.1] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/40 transition-all hover:bg-white/[0.08]"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 text-white/50 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                  {notifications}
                </span>
              )}
            </button>

            {/* Admin Avatar */}
            <button className="flex items-center gap-2 p-1.5 hover:bg-white/[0.06] rounded-xl transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                A
              </div>
            </button>
          </div>
        </header>

        {/* Page Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
    </ToastProvider>
  );
};
