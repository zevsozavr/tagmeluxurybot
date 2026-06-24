import type { Product } from '../types';

interface Props {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: Props) {
  return (
    <article
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap)',
      }}
    >
      <div
        style={{
          aspectRatio: '3 / 4',
          borderRadius: 'var(--rounded-lg)',
          overflow: 'hidden',
          background: 'var(--color-surface-container-low)',
          border: '1px solid var(--color-outline-variant)',
          position: 'relative',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        {product.originalPrice && (
          <span
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: 'var(--gradient-secondary)',
              color: '#fff',
              font: 'var(--typography-label-caps)',
              padding: '4px 8px',
              borderRadius: 'var(--rounded-full)',
            }}
          >
            SALE
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ font: 'var(--typography-label-caps)', color: 'var(--color-on-surface-variant)' }}>
          {product.category}
        </span>
        <h3 style={{ font: 'var(--typography-body-lg)', fontWeight: 600 }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ font: 'var(--typography-body-lg)', fontWeight: 700, color: 'var(--color-primary)' }}>
            ${product.price}
          </span>
          {product.originalPrice && (
            <span style={{ textDecoration: 'line-through', color: 'var(--color-on-surface-variant)', font: 'var(--typography-body-sm)' }}>
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
