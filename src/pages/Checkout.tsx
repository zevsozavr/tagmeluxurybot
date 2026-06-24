import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';

const tg = window.Telegram?.WebApp;

export function Checkout() {
  const navigate = useNavigate();
  const { totalPrice, totalItems, items, clearCart } = useCart();
  const [name, setName] = useState(tg?.initDataUnsafe.user?.first_name || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (tg?.BackButton) {
      tg.BackButton.show();
      const cb = () => navigate('/cart');
      tg.BackButton.onClick(cb);
      return () => tg.BackButton.offClick(cb);
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      name,
      phone,
      address,
      items: items.map((i) => ({
        id: i.id, name: i.name, size: i.selectedSize,
        color: i.selectedColor, quantity: i.quantity, price: i.price,
      })),
      total: totalPrice,
    };

    if (tg) {
      tg.sendData(JSON.stringify(orderData));
      tg.HapticFeedback?.notificationOccurred('success');
    }

    fetch(`/api/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData: tg?.initData || '', order: orderData }),
    }).catch(() => {});

    clearCart();
    navigate('/order-confirmed');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-background)' }}>
      <Header showBack title="Checkout" />

      <main style={{ flex: 1, overflow: 'auto', padding: '20px var(--container-padding)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ font: 'var(--typography-label-caps)', display: 'block', marginBottom: '6px', color: 'var(--color-on-surface-variant)' }}>
              Full Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 'var(--rounded-md)',
                border: '1px solid var(--color-outline-variant)',
                background: 'var(--color-surface-container-low)',
                font: 'var(--typography-body-lg)',
                color: 'var(--color-on-surface)',
              }}
            />
          </div>
          <div>
            <label style={{ font: 'var(--typography-label-caps)', display: 'block', marginBottom: '6px', color: 'var(--color-on-surface-variant)' }}>
              Phone
            </label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 'var(--rounded-md)',
                border: '1px solid var(--color-outline-variant)',
                background: 'var(--color-surface-container-low)',
                font: 'var(--typography-body-lg)',
                color: 'var(--color-on-surface)',
              }}
            />
          </div>
          <div>
            <label style={{ font: 'var(--typography-label-caps)', display: 'block', marginBottom: '6px', color: 'var(--color-on-surface-variant)' }}>
              Shipping Address
            </label>
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, City, ZIP"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 'var(--rounded-md)',
                border: '1px solid var(--color-outline-variant)',
                background: 'var(--color-surface-container-low)',
                font: 'var(--typography-body-lg)',
                color: 'var(--color-on-surface)',
              }}
            />
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--rounded-lg)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--color-outline-variant)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ font: 'var(--typography-body-lg)' }}>Items ({totalItems})</span>
              <span style={{ font: 'var(--typography-body-lg)' }}>${totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ font: 'var(--typography-body-lg)' }}>Shipping</span>
              <span style={{ color: 'var(--color-primary)', font: 'var(--typography-body-lg)' }}>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--color-outline-variant)' }}>
              <span style={{ font: 'var(--typography-headline-sm)' }}>Total</span>
              <span style={{ font: 'var(--typography-headline-sm)', color: 'var(--color-primary)' }}>${totalPrice}</span>
            </div>
          </div>

          <Button fullWidth glow type="submit">Place Order</Button>
        </form>
      </main>
    </div>
  );
}
