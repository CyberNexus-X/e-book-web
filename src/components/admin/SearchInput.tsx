import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  glass?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  glass = true
}) => {
  const inputClass = glass
    ? 'w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 text-white placeholder-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all duration-200 rounded-xl'
    : 'w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all duration-200';

  return (
    <div className={`relative ${className}`}>
      <svg 
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
};
