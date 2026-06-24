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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header title="Profile" />

      <main style={{ flex: 1, overflow: 'auto', padding: '20px var(--container-margin)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--color-outline-variant)',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--color-surface-container-high)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 600,
            }}
          >
            CC
          </div>
          <div>
            <h2 style={{ font: 'var(--typography-headline-md)', fontSize: '18px' }}>Certified Clo</h2>
            <span style={{ font: 'var(--typography-label-sm)', color: 'var(--color-on-surface-variant)' }}>
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
                padding: '14px 0',
                borderBottom: '1px solid var(--color-outline-variant)',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{r.icon}</span>
              <span style={{ font: 'var(--typography-body-md)', flex: 1 }}>{r.label}</span>
              <span style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px' }}>›</span>
            </button>
          ))}
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
