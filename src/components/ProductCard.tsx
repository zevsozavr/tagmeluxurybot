import type { Product } from '../types';

interface Props {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: Props) {
  return (
    <article onClick={onClick} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      <div style={{
        position: 'relative', height: 320, borderRadius: 'var(--rounded-xl)',
        overflow: 'hidden', background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)',
      }}>
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
