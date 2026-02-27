import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export const BannedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleLogout = async () => {
    const { signOut } = useAuthStore.getState();
    await signOut();
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-4">
          Account Banned
        </h1>

        {/* Message */}
        <p className="text-slate-400 mb-6">
          Your account has been suspended by the administrator.
        </p>

        {/* Reason if available */}
        {user?.banned_reason && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-400">
              <span className="font-medium">Reason:</span> {user.banned_reason}
            </p>
          </div>
        )}

        {/* User Info */}
        <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-400">
            If you believe this is a mistake, please contact support.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
