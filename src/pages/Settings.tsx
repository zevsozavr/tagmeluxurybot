import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomBar } from '../components/BottomBar';
import { Glass } from '../components/Glass';
import { Icon } from '../components/Icon';
import { useAuth } from '../context/AuthContext';

export function Settings() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header title="" />

      <main style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 10, padding: '0 var(--pad)', paddingTop: 24, paddingBottom: 128 }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ font: 'var(--font-headline)', color: 'var(--on-surface)' }}>Профіль</h2>
        </div>

        <Glass glow style={{ borderRadius: 'var(--rounded-lg)', padding: 16, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(197,234,255,0.2)', flexShrink: 0, background: 'var(--surface-low)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="person" style={{ fontSize: 32, color: 'var(--primary)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ font: 'var(--font-headline)', fontSize: 18, color: 'var(--primary)' }}>{user?.first_name || 'Guest'}</h3>
            <p style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>@{user?.username || 'user'}</p>
          </div>
        </Glass>

        {isAdmin && (
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ font: 'var(--font-label)', color: 'var(--tertiary-dim)', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 4px', marginBottom: 8 }}>Адмін</h4>
            <Glass style={{ borderRadius: 'var(--rounded-lg)', overflow: 'hidden' }}>
              <button onClick={() => navigate('/admin')} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 16, cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--on-surface)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon name="admin_panel_settings" style={{ color: 'var(--tertiary-dim)' }} />
                  <span style={{ font: 'var(--font-body)' }}>Панель керування</span>
                </div>
                <Icon name="chevron_right" style={{ color: 'var(--on-surface-variant)' }} />
              </button>
            </Glass>
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <h4 style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 4px', marginBottom: 8 }}>Підтримка</h4>
          <Glass style={{ borderRadius: 'var(--rounded-lg)', overflow: 'hidden' }}>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--on-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name="support_agent" style={{ color: 'var(--primary)' }} />
                <span style={{ font: 'var(--font-body)' }}>Написати нам</span>
              </div>
              <Icon name="chevron_right" style={{ color: 'var(--on-surface-variant)' }} />
            </button>
          </Glass>
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
