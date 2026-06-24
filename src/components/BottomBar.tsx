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
        padding: '8px var(--container-margin)',
        borderTop: '1px solid var(--color-outline-variant)',
        background: 'var(--color-surface)',
        position: 'sticky',
        bottom: 0,
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
              font: 'var(--typography-label-sm)',
              color: active ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              padding: '4px 16px',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: '18px' }}>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.label === 'Bag' && totalItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: '8px',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  fontSize: '10px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
