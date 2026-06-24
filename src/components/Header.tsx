import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  showBack?: boolean;
  right?: React.ReactNode;
}

export function Header({ title, showBack, right }: Props) {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px var(--container-padding)',
        borderBottom: '1px solid var(--color-outline-variant)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ width: '40px' }}>
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--glass-bg)',
              border: '1px solid var(--color-outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            ←
          </button>
        )}
      </div>
      {title ? (
        <h1 style={{ font: 'var(--typography-headline-sm)', textAlign: 'center' }}>{title}</h1>
      ) : (
        <span style={{ font: 'var(--typography-headline-sm)', letterSpacing: '0.05em', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          CERTIFIED CLO
        </span>
      )}
      <div style={{ width: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        {right}
      </div>
    </header>
  );
}
