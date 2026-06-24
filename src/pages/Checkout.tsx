import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Glass } from '../components/Glass';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LangContext';

const tg = window.Telegram?.WebApp;

export function Checkout() {
  const navigate = useNavigate();
  const { totalPrice, totalItems, items, clearCart } = useCart();
  const { t } = useLang();
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
    const orderData = { name, phone, address, items: items.map((i) => ({ id: i.id, name: i.name, size: i.selectedSize, color: i.selectedColor, quantity: i.quantity, price: i.price })), total: totalPrice };
    if (tg) { tg.sendData(JSON.stringify(orderData)); tg.HapticFeedback?.notificationOccurred('success'); }
    fetch('/api/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ initData: tg?.initData || '', order: orderData }) }).catch(() => {});
    clearCart();
    navigate('/order-confirmed');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header showBack title={t('cart.checkout')} />
      <main style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 10, padding: '24px var(--pad)', paddingBottom: 32 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ font: 'var(--font-label)', display: 'block', marginBottom: 6, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('checkout.name')}</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t('checkout.placeholder.name')}
              style={{ width: '100%', padding: '14px 16px', borderRadius: 'var(--rounded-lg)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', font: 'var(--font-body)', color: 'var(--on-surface)', backdropFilter: 'blur(8px)' }} />
          </div>
          <div>
            <label style={{ font: 'var(--font-label)', display: 'block', marginBottom: 6, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('checkout.phone')}</label>
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('checkout.placeholder.phone')}
              style={{ width: '100%', padding: '14px 16px', borderRadius: 'var(--rounded-lg)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', font: 'var(--font-body)', color: 'var(--on-surface)', backdropFilter: 'blur(8px)' }} />
          </div>
          <div>
            <label style={{ font: 'var(--font-label)', display: 'block', marginBottom: 6, color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('checkout.address')}</label>
            <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t('checkout.placeholder.address')}
              style={{ width: '100%', padding: '14px 16px', borderRadius: 'var(--rounded-lg)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', font: 'var(--font-body)', color: 'var(--on-surface)', backdropFilter: 'blur(8px)' }} />
          </div>
          <Glass card style={{ padding: 16, borderRadius: 'var(--rounded-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ font: 'var(--font-body)' }}>{t('checkout.items')} ({totalItems})</span><span style={{ font: 'var(--font-body)' }}>{totalPrice.toLocaleString()}₴</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ font: 'var(--font-body)' }}>{t('checkout.delivery')}</span><span style={{ color: 'var(--primary)', font: 'var(--font-body)' }}>{t('checkout.free')}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: 8 }}><span style={{ font: 'var(--font-headline)' }}>{t('checkout.total')}</span><span style={{ font: 'var(--font-headline)', color: 'var(--primary)' }}>{totalPrice.toLocaleString()}₴</span></div>
          </Glass>
          <Button fullWidth glow type="submit">{t('checkout.submit')}</Button>
        </form>
      </main>
    </div>
  );
}
