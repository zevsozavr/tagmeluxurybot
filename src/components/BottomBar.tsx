import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const tabs = [
  { label: 'Shop', path: '/', icon: '✦' },
  { label: 'Bag', path: '/cart', icon: '◈' },
  { label: 'Profile', path: '/settings', icon: '◯' },
];

export function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px var(--container-padding)',
        borderTop: '1px solid var(--color-outline-variant)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
      }}
    >
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              font: 'var(--typography-label-caps)',
              color: active ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              padding: '4px 16px',
              position: 'relative',
              ...(active ? { textShadow: '0 0 10px rgba(175,198,255,0.5)' } : {}),
            }}
          >
            <span style={{
              fontSize: '18px',
              ...(active ? {
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              } : {}),
            }}>
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            {active && (
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  width: '24px',
                  height: '3px',
                  borderRadius: '2px',
                  background: 'var(--gradient-primary)',
                }}
              />
            )}
            {tab.label === 'Bag' && totalItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: '4px',
                  background: 'var(--gradient-secondary)',
                  color: '#fff',
                  fontSize: '10px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
