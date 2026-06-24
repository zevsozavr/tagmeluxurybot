import type { Product } from '../types';
import { useLang } from '../context/LangContext';

interface Props {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: Props) {
  const { t } = useLang();
  return (
    <article onClick={onClick} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      <div style={{
        position: 'relative', height: 320, borderRadius: 'var(--rounded-xl)',
        overflow: 'hidden', background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(11,19,38,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', font: 'var(--font-label)', fontSize: 11, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t('product.condition.' + product.condition.toLowerCase().replace(/\s+/g, '_'))}
        </div>
        <img src={product.image} alt={product.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
        />
        <div style={{
          position: 'absolute', left: 16, right: 16, bottom: 16,
          background: 'var(--glass-card-bg)', backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-card-border)',
          borderRadius: 'var(--rounded-lg)', padding: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <p style={{ font: 'var(--font-headline-sm)', fontSize: 14, color: 'var(--on-surface)' }}>{product.name}</p>
            <p style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>
              {product.price.toLocaleString()}₴
              {product.originalPrice && <span style={{ textDecoration: 'line-through', marginLeft: 8, opacity: 0.6 }}>{product.originalPrice.toLocaleString()}₴</span>}
            </p>
          </div>
          <button style={{
            width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)',
            color: 'var(--on-primary)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', border: 'none',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
