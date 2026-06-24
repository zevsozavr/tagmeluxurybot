import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  showBack?: boolean;
  right?: React.ReactNode;
  onBack?: () => void;
}

export function Header({ title, showBack, right, onBack }: Props) {
  const navigate = useNavigate();

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px var(--pad)', height: 64, position: 'sticky', top: 0, zIndex: 60,
      background: 'rgba(11,19,38,0.4)', backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{ width: 40, display: 'flex', alignItems: 'center' }}>
        {showBack && (
          <button onClick={onBack || (() => navigate(-1))} style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
          </button>
        )}
      </div>
      {title ? (
        <h1 style={{ font: 'var(--font-headline)', color: 'var(--primary)', letterSpacing: 'var(--ls-headline)' }}>{title}</h1>
      ) : (
        <span style={{ font: 'var(--font-display)', color: 'var(--primary)', letterSpacing: 'var(--ls-display)', fontSize: 22 }}>CERTIFIED CLO</span>
      )}
      <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {right}
      </div>
    </header>
  );
}
