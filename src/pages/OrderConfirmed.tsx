import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Glass } from '../components/Glass';

export function OrderConfirmed() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
        background: 'radial-gradient(ellipse at top, rgba(125,211,252,0.1), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -128, right: -128, width: 384, height: 384,
        background: 'rgba(125,211,252,0.1)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -128, left: -128, width: 384, height: 384,
        background: 'rgba(125,211,252,0.05)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 var(--pad)', position: 'relative', zIndex: 10 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', background: 'rgba(125,211,252,0.2)',
          border: '1px solid rgba(125,211,252,0.3)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', marginBottom: 24, boxShadow: '0 0 40px rgba(125,211,252,0.2)',
        }}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24", color: 'var(--primary)', fontSize: 40 }}>check_circle</span>
        </div>

        <h1 style={{ font: 'var(--font-display)', fontSize: 26, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 8 }}>Замовлення підтверджено</h1>
        <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)', marginBottom: 24, maxWidth: 300, textAlign: 'center' }}>
          Дякуємо! Ми зв'яжемося з вами найближчим часом.
        </p>

        <Glass glow card style={{ width: '100%', borderRadius: 'var(--rounded-lg)', padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 12, marginBottom: 16 }}>
            <span style={{ font: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--on-surface-variant)' }}>Номер</span>
            <span style={{ font: 'var(--font-label-lg)', color: 'var(--primary)' }}>#CC-{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--on-surface-variant)', font: 'var(--font-label)' }}>
              <span>Сума</span>
              <span style={{ color: 'var(--on-surface)' }}>Включено</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--on-surface-variant)', font: 'var(--font-label)' }}>
              <span>Доставка</span>
              <span style={{ color: 'var(--primary)', opacity: 0.8 }}>Безкоштовно</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 12, marginTop: 8 }}>
              <span style={{ font: 'var(--font-label-lg)' }}>Всього</span>
              <span style={{ font: 'var(--font-headline)', color: 'var(--primary)' }}>Списано з карти</span>
            </div>
          </div>
        </Glass>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button fullWidth glow variant="primary" onClick={() => navigate('/')} style={{ borderRadius: 'var(--rounded-lg)' }}>
            Продовжити
          </Button>
        </div>
      </main>
    </div>
  );
}
