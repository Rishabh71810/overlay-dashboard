import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import './pickle-glass.css';

interface PickleGlassProps {
  children?: ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'subtle';
  className?: string;
  isCard?: boolean;
  isButton?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const PickleGlass: React.FC<PickleGlassProps> = ({
  children,
  variant = 'default',
  className = '',
  isCard = false,
  isButton = false,
  onClick,
  style = {}
}) => {
  const baseClass = 'pickle-glass';
  const variantClass = variant !== 'default' ? `pg-${variant}` : '';
  const componentClass = isCard ? 'pg-card' : isButton ? 'pg-button' : '';
  
  const classes = [baseClass, variantClass, componentClass, className]
    .filter(Boolean)
    .join(' ');

  const Component = isButton ? motion.button : motion.div;

  return (
    <Component
      className={classes}
      onClick={onClick}
      style={style}
      whileHover={isButton || isCard ? { scale: 1.02 } : {}}
      whileTap={isButton ? { scale: 0.98 } : {}}
    >
      {children}
    </Component>
  );
};

interface PickleGlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const PickleGlassInput: React.FC<PickleGlassInputProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="pg-input-wrapper">
      {label && (
        <label className="pg-input-label" style={{ 
          fontSize: '0.875rem', 
          color: 'var(--pg-secondary)',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          {label}
        </label>
      )}
      <input
        className={`pg-input ${className}`}
        {...props}
      />
    </div>
  );
};

interface PickleGlassBadgeProps {
  children: ReactNode;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
}

export const PickleGlassBadge: React.FC<PickleGlassBadgeProps> = ({
  children,
  color = 'primary'
}) => {
  const colorStyles: Record<string, React.CSSProperties> = {
    primary: { background: 'transparent', borderColor: 'rgba(59, 130, 246, 0.3)', color: '#3b82f6' },
    accent: { background: 'transparent', borderColor: 'rgba(6, 182, 212, 0.3)', color: '#06b6d4' },
    success: { background: 'transparent', borderColor: 'rgba(34, 197, 94, 0.3)', color: '#22c55e' },
    warning: { background: 'transparent', borderColor: 'rgba(251, 146, 60, 0.3)', color: '#fb923c' },
    error: { background: 'transparent', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' },
  };

  return (
    <span className="pg-badge" style={colorStyles[color]}>
      {children}
    </span>
  );
};

interface PickleGlassOverlayProps {
  children?: ReactNode;
  isExpanded: boolean;
  position?: { x: number; y: number };
  width?: number | string;
  height?: number | string;
}

export const PickleGlassOverlay: React.FC<PickleGlassOverlayProps> = ({
  children,
  isExpanded,
  position = { x: 0, y: 0 },
  width = isExpanded ? 420 : 72,
  height = isExpanded ? 600 : 32,
}) => {
  return (
    <motion.div
      className={`pg-overlay ${isExpanded ? 'expanded' : 'collapsed'}`}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animate={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      <div className="pg-glow" />
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}>
        {children}
      </div>
    </motion.div>
  );
};

export default PickleGlass;