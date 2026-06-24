import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { products } from '../data';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Product not found</p>
        <Button variant="secondary" onClick={() => navigate('/')}>Back to Shop</Button>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-background)' }}>
      <Header showBack title={product.category} />

      <main style={{ flex: 1, overflow: 'auto' }}>
        <div
          style={{
            aspectRatio: '3 / 4',
            background: 'var(--color-surface-container-low)',
            margin: '0 var(--container-padding)',
            marginTop: '16px',
            borderRadius: 'var(--rounded-xl)',
            overflow: 'hidden',
            border: '1px solid var(--color-outline-variant)',
          }}
        >
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ padding: '20px var(--container-padding)' }}>
          <span style={{ font: 'var(--typography-label-caps)', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {product.category}
          </span>
          <h1 style={{ font: 'var(--typography-headline-md)', marginTop: '4px', color: 'var(--color-on-surface)' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ font: 'var(--typography-stat-value)', color: 'var(--color-primary)' }}>${product.price}</span>
            {product.originalPrice && (
              <span style={{ textDecoration: 'line-through', color: 'var(--color-on-surface-variant)', font: 'var(--typography-body-lg)' }}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          <p style={{ font: 'var(--typography-body-lg)', color: 'var(--color-on-surface-variant)', marginTop: '16px', lineHeight: 1.6 }}>
            {product.description}
          </p>

          <div style={{ marginTop: '24px' }}>
            <span style={{ font: 'var(--typography-label-caps)', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Color — {selectedColor}
            </span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: c.hex,
                    border: selectedColor === c.name ? '2px solid var(--color-primary)' : '2px solid var(--color-outline-variant)',
                    cursor: 'pointer',
                    ...(selectedColor === c.name ? { boxShadow: '0 0 12px rgba(82,141,255,0.4)' } : {}),
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <span style={{ font: 'var(--typography-label-caps)', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Size — {selectedSize}
            </span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 'var(--rounded-md)',
                    font: 'var(--typography-label-caps)',
                    background: selectedSize === s ? 'var(--gradient-primary)' : 'var(--glass-bg)',
                    color: selectedSize === s ? '#fff' : 'var(--color-on-surface)',
                    border: selectedSize === s ? 'none' : '1px solid var(--color-outline-variant)',
                    cursor: 'pointer',
                    backdropFilter: selectedSize !== s ? 'blur(12px)' : 'none',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div
        style={{
          padding: '12px var(--container-padding)',
          borderTop: '1px solid var(--color-outline-variant)',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Button fullWidth glow onClick={handleAdd}>
          {added ? '✓ Added to Bag' : 'Add to Bag — $' + product.price}
        </Button>
      </div>
    </div>
  );
}
