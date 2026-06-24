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
        id: i.id,
        name: i.name,
        size: i.selectedSize,
        color: i.selectedColor,
        quantity: i.quantity,
        price: i.price,
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header showBack title="Checkout" />

      <main style={{ flex: 1, overflow: 'auto', padding: '20px var(--container-margin)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ font: 'var(--typography-label-sm)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Full Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--rounded)',
                border: '1px solid var(--color-outline-variant)',
                background: 'var(--color-surface-container-low)',
                font: 'var(--typography-body-md)',
              }}
            />
          </div>
          <div>
            <label style={{ font: 'var(--typography-label-sm)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Phone
            </label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--rounded)',
                border: '1px solid var(--color-outline-variant)',
                background: 'var(--color-surface-container-low)',
                font: 'var(--typography-body-md)',
              }}
            />
          </div>
          <div>
            <label style={{ font: 'var(--typography-label-sm)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Shipping Address
            </label>
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, City, ZIP"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--rounded)',
                border: '1px solid var(--color-outline-variant)',
                background: 'var(--color-surface-container-low)',
                font: 'var(--typography-body-md)',
              }}
            />
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--rounded)',
              background: 'var(--color-surface-container-low)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ font: 'var(--typography-body-md)' }}>Items ({totalItems})</span>
              <span style={{ font: 'var(--typography-body-md)' }}>${totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ font: 'var(--typography-body-md)' }}>Shipping</span>
              <span style={{ font: 'var(--typography-body-md)' }}>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--color-outline-variant)' }}>
              <span style={{ font: 'var(--typography-body-lg)', fontWeight: 600 }}>Total</span>
              <span style={{ font: 'var(--typography-body-lg)', fontWeight: 600 }}>${totalPrice}</span>
            </div>
          </div>

          <Button fullWidth type="submit">Place Order</Button>
        </form>
      </main>
    </div>
  );
}
