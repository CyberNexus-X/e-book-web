import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'glass' | 'glass-success' | 'glass-danger' | 'glass-warning';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-sky-100 text-sky-700',
    // Glass variants for admin
    glass: 'bg-white/10 border border-white/20 text-white/80 backdrop-blur-sm',
    'glass-success': 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 backdrop-blur-sm shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    'glass-danger': 'bg-red-500/20 border border-red-500/30 text-red-400 backdrop-blur-sm shadow-[0_0_10px_rgba(239,68,68,0.2)]',
    'glass-warning': 'bg-amber-500/20 border border-amber-500/30 text-amber-400 backdrop-blur-sm shadow-[0_0_10px_rgba(245,158,11,0.2)]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {variant.includes('glass') && variant !== 'glass' && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'glass-success' ? 'bg-emerald-400' : 
          variant === 'glass-danger' ? 'bg-red-400' : 
          variant === 'glass-warning' ? 'bg-amber-400' : 'bg-white/50'
        }`} />
      )}
      {children}
    </span>
  );
};
