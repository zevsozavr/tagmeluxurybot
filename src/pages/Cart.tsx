import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { BottomBar } from '../components/BottomBar';
import { Glass } from '../components/Glass';
import { Icon } from '../components/Icon';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LangContext';

export function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeItem } = useCart();
  const { t, plural } = useLang();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header showBack title="" />

      <main style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 10, padding: '0 var(--pad)', paddingTop: 32, paddingBottom: 128 }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)', marginBottom: 16 }}>{t('cart.empty')}</p>
            <Button variant="glass" onClick={() => navigate('/')}>{t('cart.continue')}</Button>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h1 style={{ font: 'var(--font-display)', color: 'var(--on-surface)', fontSize: 36 }}>{t('cart.title')}</h1>
              <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)', marginTop: 8 }}>{items.length} {plural(items.length, t('cart.item.one'), t('cart.item.few'), t('cart.item.many'))}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {items.map((item) => {
                const key = item.id + item.selectedSize + item.selectedColor;
                return (
                  <Glass card key={key} style={{ display: 'flex', gap: 16, padding: 16, borderRadius: 'var(--rounded-xl)', alignItems: 'stretch' }}>
                    <div style={{ width: 96, height: 128, flexShrink: 0, borderRadius: 'var(--rounded-lg)', overflow: 'hidden', background: 'var(--surface-low)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '4px 0' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h2 style={{ font: 'var(--font-label-lg)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.name}</h2>
                          <button onClick={() => removeItem(key)}
                            style={{ color: 'var(--on-surface-variant)', cursor: 'pointer', padding: 2 }}>
                            <Icon name="close" style={{ fontSize: 20 }} />
                          </button>
                        </div>
                        <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)', marginTop: 4 }}>{item.selectedColor} / {t('cart.size')} {item.selectedSize}</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <Glass style={{ display: 'flex', alignItems: 'center', borderRadius: 'var(--radius-full)', padding: '0 4px' }}>
                          <button onClick={() => updateQuantity(key, item.quantity - 1)} style={{ padding: '4px 8px', color: 'var(--on-surface)', cursor: 'pointer' }}>
                            <Icon name="remove" style={{ fontSize: 16 }} />
                          </button>
                          <span style={{ font: 'var(--font-body)', width: 32, textAlign: 'center', color: 'var(--on-surface)' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(key, item.quantity + 1)} style={{ padding: '4px 8px', color: 'var(--on-surface)', cursor: 'pointer' }}>
                            <Icon name="add" style={{ fontSize: 16 }} />
                          </button>
                        </Glass>
                        <span style={{ font: 'var(--font-label-lg)', color: 'var(--primary)' }}>{(item.price * item.quantity).toLocaleString()}₴</span>
                      </div>
                    </div>
                  </Glass>
                );
              })}
            </div>

            <Glass card style={{ padding: 24, borderRadius: 'var(--rounded-xl)', marginTop: 32 }}>
              <h3 style={{ font: 'var(--font-label-lg)', textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12, marginBottom: 16 }}>{t('cart.summary')}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: 'var(--on-surface-variant)', font: 'var(--font-body)' }}>
                <span>{t('cart.subtotal')}</span>
                <span style={{ color: 'var(--on-surface)' }}>{totalPrice.toLocaleString()}₴</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, color: 'var(--on-surface-variant)', font: 'var(--font-body)' }}>
                <span>{t('cart.shipping')}</span>
                <span style={{ color: 'var(--on-surface)' }}>{t('cart.shipping.calc')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, marginBottom: 24 }}>
                <span style={{ font: 'var(--font-headline)', color: 'var(--primary)' }}>{t('cart.total')}</span>
                <span style={{ font: 'var(--font-headline)', color: 'var(--primary)' }}>{totalPrice.toLocaleString()}₴</span>
              </div>
              <Button fullWidth glow variant="primary" onClick={() => navigate('/checkout')}>
                {t('cart.checkout')}
                <Icon name="chat" style={{ fontSize: 20 }} />
              </Button>
            </Glass>
          </>
        )}
      </main>

      <BottomBar />
    </div>
  );
}
