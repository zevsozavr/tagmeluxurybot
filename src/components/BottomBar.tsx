import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Icon } from './Icon';

const tabs = [
  { label: 'Shop', path: '/', icon: 'storefront' },
  { label: 'Bag', path: '/cart', icon: 'shopping_bag' },
  { label: 'Profile', path: '/settings', icon: 'person' },
];

export function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { isAdmin } = useAuth();

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '8px 32px', paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(23,31,51,0.3)', backdropFilter: 'blur(32px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderTopLeftRadius: 16, borderTopRightRadius: 16,
    }}>
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button key={tab.path} onClick={() => navigate(tab.path)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 48, height: 48, borderRadius: '50%',
            background: active ? 'var(--primary)' : 'transparent',
            color: active ? 'var(--on-primary)' : 'var(--on-surface-variant)',
            boxShadow: active ? '0 0 15px rgba(123,209,250,0.3)' : 'none',
            transition: 'all 0.2s', position: 'relative',
          }}>
            <Icon name={tab.icon} style={{ fontSize: 24 }} />
            {tab.icon === 'shopping_bag' && totalItems > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4, width: 8, height: 8,
                borderRadius: '50%', background: 'var(--primary-container)',
              }} />
            )}
          </button>
        );
      })}
      {isAdmin && (
        <button onClick={() => navigate('/admin')} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 48, height: 48, borderRadius: '50%',
          background: location.pathname.startsWith('/admin') ? 'var(--tertiary-dim)' : 'transparent',
          color: location.pathname.startsWith('/admin') ? '#000' : 'var(--on-surface-variant)',
          transition: 'all 0.2s',
        }}>
          <Icon name="admin_panel_settings" style={{ fontSize: 24 }} />
        </button>
      )}
    </nav>
  );
}
