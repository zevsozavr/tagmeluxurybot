import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { BottomBar } from '../components/BottomBar';
import { useCart } from '../context/CartContext';

export function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeItem } = useCart();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-background)' }}>
      <Header title="Shopping Bag" showBack />

      <main style={{ flex: 1, overflow: 'auto', padding: '20px var(--container-padding)' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '60px' }}>
            <p style={{ font: 'var(--typography-body-lg)', color: 'var(--color-on-surface-variant)' }}>Your bag is empty</p>
            <Button variant="secondary" style={{ marginTop: '16px' }} onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map((item) => {
              const key = item.id + item.selectedSize + item.selectedColor;
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: 'var(--rounded-lg)',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--color-outline-variant)',
                    backdropFilter: 'blur(12px)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '100px',
                      borderRadius: 'var(--rounded-md)',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: 'var(--color-surface-container-low)',
                    }}
                  >
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ font: 'var(--typography-body-lg)', fontWeight: 600 }}>{item.name}</h3>
                      <span style={{ font: 'var(--typography-label-caps)', color: 'var(--color-on-surface-variant)' }}>
                        {item.selectedColor} / {item.selectedSize}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => updateQuantity(key, item.quantity - 1)}
                          style={{
                            width: '28px', height: '28px', borderRadius: '50%',
                            border: '1px solid var(--color-outline)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontSize: '14px', cursor: 'pointer',
                            color: 'var(--color-on-surface)',
                          }}
                        >
                          −
                        </button>
                        <span style={{ font: 'var(--typography-body-lg)', minWidth: '20px', textAlign: 'center', color: 'var(--color-on-surface)' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(key, item.quantity + 1)}
                          style={{
                            width: '28px', height: '28px', borderRadius: '50%',
                            border: '1px solid var(--color-outline)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontSize: '14px', cursor: 'pointer',
                            color: 'var(--color-on-surface)',
                          }}
                        >
                          +
                        </button>
                      </div>
                      <span style={{ font: 'var(--typography-body-lg)', fontWeight: 700, color: 'var(--color-primary)' }}>
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(key)}
                    style={{
                      position: 'absolute', top: '8px', right: '8px',
                      color: 'var(--color-on-surface-variant)', fontSize: '14px',
                      padding: '4px', cursor: 'pointer',
                      width: '24px', height: '24px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--color-surface-container)',
                    }}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {items.length > 0 && (
        <div
          style={{
            padding: '12px var(--container-padding)',
            borderTop: '1px solid var(--color-outline-variant)',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ font: 'var(--typography-body-lg)' }}>Total</span>
            <span style={{ font: 'var(--typography-headline-sm)', color: 'var(--color-primary)' }}>${totalPrice}</span>
          </div>
          <Button fullWidth glow onClick={() => navigate('/checkout')}>
            Checkout
          </Button>
        </div>
      )}

      <BottomBar />
    </div>
  );
}
