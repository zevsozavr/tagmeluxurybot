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
        padding: '12px var(--container-margin)',
        borderBottom: '1px solid var(--color-outline-variant)',
      }}
    >
      <div style={{ width: '40px' }}>
        {showBack && (
          <button onClick={() => navigate(-1)} style={{ fontSize: '20px', padding: '4px' }}>
            ←
          </button>
        )}
      </div>
      {title ? (
        <h1 style={{ font: 'var(--typography-headline-md)', textAlign: 'center' }}>{title}</h1>
      ) : (
        <span style={{ font: 'var(--typography-headline-md)', letterSpacing: '0.1em' }}>CERTIFIED CLO</span>
      )}
      <div style={{ width: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        {right}
      </div>
    </header>
  );
}
