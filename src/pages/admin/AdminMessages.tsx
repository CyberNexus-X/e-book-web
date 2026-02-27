import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminMessages: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to compose page by default
    navigate('/1234/admin/compose');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
