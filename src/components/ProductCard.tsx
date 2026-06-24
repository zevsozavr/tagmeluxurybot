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
        gap: '8px',
      }}
    >
      <div
        style={{
          aspectRatio: '3 / 4',
          borderRadius: 'var(--rounded)',
          overflow: 'hidden',
          background: 'var(--color-surface-container-low)',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ font: 'var(--typography-label-sm)', color: 'var(--color-on-surface-variant)' }}>
          {product.category}
        </span>
        <h3 style={{ font: 'var(--typography-body-md)', fontWeight: 500 }}>
          {product.name}
        </h3>
        <span style={{ font: 'var(--typography-body-md)', fontWeight: 600 }}>
          ${product.price}
          {product.originalPrice && (
            <span style={{ textDecoration: 'line-through', color: 'var(--color-on-surface-variant)', fontWeight: 400, marginLeft: '6px', fontSize: '14px' }}>
              ${product.originalPrice}
            </span>
          )}
        </span>
      </div>
    </article>
  );
}
