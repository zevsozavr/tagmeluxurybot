import { Header } from '../components/Header';
import { BottomBar } from '../components/BottomBar';

const rows = [
  { label: 'My Orders', icon: '◈' },
  { label: 'Shipping Info', icon: '◎' },
  { label: 'Payment Methods', icon: '□' },
  { label: 'Size Guide', icon: '◇' },
  { label: 'Notifications', icon: '🔔' },
  { label: 'Help & Support', icon: '?' },
];

export function Settings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-background)' }}>
      <Header title="Profile" />

      <main style={{ flex: 1, overflow: 'auto', padding: '20px var(--container-padding)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            borderRadius: 'var(--rounded-lg)',
            background: 'var(--glass-bg)',
            border: '1px solid var(--color-outline-variant)',
            backdropFilter: 'blur(12px)',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            CC
          </div>
          <div>
            <h2 style={{ font: 'var(--typography-headline-sm)', fontSize: '18px', color: 'var(--color-on-surface)' }}>Certified Clo</h2>
            <span style={{ font: 'var(--typography-label-caps)', color: 'var(--color-on-surface-variant)' }}>
              Member since 2026
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {rows.map((r) => (
            <button
              key={r.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                borderRadius: 'var(--rounded-md)',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                color: 'var(--color-on-surface)',
                transition: 'background 0.2s',
              }}
            >
              <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{r.icon}</span>
              <span style={{ font: 'var(--typography-body-lg)', flex: 1 }}>{r.label}</span>
              <span style={{ color: 'var(--color-on-surface-variant)', fontSize: '16px' }}>→</span>
            </button>
          ))}
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
