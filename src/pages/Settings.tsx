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
      <Header title="ELITE" />

      <main style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 10, padding: '0 var(--pad)', paddingTop: 24, paddingBottom: 128 }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ font: 'var(--font-headline)', color: 'var(--on-surface)' }}>Settings</h2>
        </div>

        {/* Profile */}
        <Glass glow style={{ borderRadius: 'var(--rounded-lg)', padding: 16, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(197,234,255,0.2)', flexShrink: 0, background: 'var(--surface-low)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="person" style={{ fontSize: 32, color: 'var(--primary)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ font: 'var(--font-headline)', fontSize: 18, color: 'var(--primary)' }}>{user?.first_name || 'Guest'}</h3>
            <p style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>@{user?.username || 'user'}</p>
            <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', padding: '4px 8px', borderRadius: 'var(--radius-full)', background: 'rgba(197,234,255,0.1)', border: '1px solid rgba(197,234,255,0.2)' }}>
              <span style={{ font: 'var(--font-label)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--primary)' }}>Pro Member</span>
            </div>
          </div>
          <button style={{ color: 'var(--on-surface-variant)', cursor: 'pointer' }}>
            <Icon name="edit" />
          </button>
        </Glass>

        {/* Interface */}
        <div style={{ marginBottom: 12 }}>
          <h4 style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 4px', marginBottom: 8 }}>Interface</h4>
          <Glass style={{ borderRadius: 'var(--rounded-lg)', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="dark_mode" style={{ color: 'var(--primary)' }} />
              <span style={{ font: 'var(--font-body)' }}>Dark Theme</span>
            </div>
            <div style={{ position: 'relative', display: 'inline-block', width: 48, height: 24 }}>
              <input type="checkbox" id="theme-toggle" style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
                onChange={(e) => {
                  if (e.target.checked) document.documentElement.classList.remove('dark');
                  else document.documentElement.classList.add('dark');
                }} />
              <label htmlFor="theme-toggle" style={{
                display: 'block', overflow: 'hidden', height: 24, borderRadius: 12,
                background: 'var(--surface-high)', cursor: 'pointer', position: 'relative',
              }}>
                <span style={{
                  display: 'block', width: 20, height: 20, borderRadius: '50%',
                  background: '#fff', position: 'absolute', top: 2, right: 2,
                  transition: 'all 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }} />
              </label>
            </div>
          </Glass>
        </div>

        {/* Admin section */}
        {isAdmin && (
          <div style={{ marginBottom: 12 }}>
            <h4 style={{ font: 'var(--font-label)', color: 'var(--tertiary-dim)', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 4px', marginBottom: 8 }}>Admin</h4>
            <Glass style={{ borderRadius: 'var(--rounded-lg)', overflow: 'hidden' }}>
              <button onClick={() => navigate('/admin')} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 16, cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--on-surface)',
                transition: 'background 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon name="admin_panel_settings" style={{ color: 'var(--tertiary-dim)' }} />
                  <span style={{ font: 'var(--font-body)' }}>Admin Panel</span>
                </div>
                <Icon name="chevron_right" style={{ color: 'var(--on-surface-variant)' }} />
              </button>
            </Glass>
          </div>
        )}

        {/* Account & Support */}
        <div style={{ marginBottom: 12 }}>
          <h4 style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0 4px', marginBottom: 8 }}>Account & Support</h4>
          <Glass style={{ borderRadius: 'var(--rounded-lg)', overflow: 'hidden' }}>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--on-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name="history" style={{ color: 'var(--primary)' }} />
                <span style={{ font: 'var(--font-body)' }}>Order History</span>
              </div>
              <Icon name="chevron_right" style={{ color: 'var(--on-surface-variant)' }} />
            </button>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 16px' }} />
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--on-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name="support_agent" style={{ color: 'var(--primary)' }} />
                <span style={{ font: 'var(--font-body)' }}>Contact Support</span>
              </div>
              <Icon name="chevron_right" style={{ color: 'var(--on-surface-variant)' }} />
            </button>
          </Glass>
        </div>

        <p style={{ textAlign: 'center', marginTop: 32, font: 'var(--font-label)', color: 'rgba(190,200,206,0.4)' }}>ELITE VERSION 4.2.0-GLACIER</p>
      </main>

      <BottomBar />
    </div>
  );
}
