import React from 'react';
import { getInitials } from '../../lib/utils';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
  online?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name = '', size = 40, online, className = '' }) => {
  return (
    <div className={`avatar ${className}`} style={{ width: size, height: size, fontSize: size * 0.35, position: 'relative' }}>
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span>{getInitials(name)}</span>
      )}
      {online && <span className="online-dot" />}
    </div>
  );
};
