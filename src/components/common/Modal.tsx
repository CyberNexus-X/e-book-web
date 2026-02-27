import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: number;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, maxWidth = 480 }) => {
  if (!open) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="card"
        style={{ width: '90%', maxWidth, maxHeight: '85dvh', overflowY: 'auto', padding: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: 18 }}>{title}</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 20, lineHeight: 1 }}>✕</button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
