import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  glow?: boolean;
}

export function Button({ variant = 'primary', fullWidth, glow, style, children, ...props }: Props) {
  const base: React.CSSProperties = {
    font: 'var(--typography-label-caps)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '14px 24px',
    borderRadius: 'var(--rounded-md)',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
    overflow: 'hidden',
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--gradient-primary)',
      color: '#fff',
      ...(glow ? { boxShadow: '0 0 20px rgba(82,141,255,0.3)' } : {}),
    },
    secondary: {
      background: 'var(--glass-bg)',
      color: 'var(--color-on-surface)',
      border: '1px solid var(--color-outline-variant)',
      backdropFilter: 'blur(12px)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-on-surface-variant)',
    },
  };

  return (
    <button
      style={{
        ...base,
        ...variants[variant],
        ...(fullWidth ? { width: '100%' } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
