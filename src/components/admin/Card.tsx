import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  glass = true
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Glass style for admin panel
  const glassClass = glass 
    ? 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.05] transition-all duration-200 admin-card'
    : 'bg-white rounded-xl shadow-sm border border-slate-200';

  return (
    <div className={`${glassClass} rounded-2xl ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-white/50 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
