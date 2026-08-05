import React from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradientColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color,
  bgColor,
  trend,
  gradientColor = 'from-violet-500 to-indigo-500'
}) => {
  return (
    <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300 admin-card group">
      {/* Gradient accent top border */}
      <div 
        className={`absolute top-0 left-0 right-0 h-[2px bg-gradient-to-r ${gradientColor} opacity-80`}
      />
      
      {/* Glow effect on hover */}
      <div className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300`} />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm"
          style={{ background: bgColor }}
        >
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <p className="text-white/50 text-sm font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold" style={{ color }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );
};
