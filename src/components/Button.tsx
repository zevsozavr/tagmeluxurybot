import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

const styles: Record<string, React.CSSProperties> = {
  base: {
    font: 'var(--typography-label-lg)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    padding: '14px 24px',
    borderRadius: 'var(--rounded)',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  primary: {
    background: 'var(--color-primary)',
    color: 'var(--color-on-primary)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-on-surface)',
    border: '1px solid var(--color-outline)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-on-surface-variant)',
  },
};

export function Button({ variant = 'primary', fullWidth, style, ...props }: Props) {
  return (
    <button
      style={{
        ...styles.base,
        ...styles[variant],
        ...(fullWidth ? { width: '100%' } : {}),
        ...style,
      }}
      {...props}
    />
  );
}
