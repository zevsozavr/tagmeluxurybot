import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Glass } from '../components/Glass';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products } = useData();
  const { t } = useLang();
  const product = products.find((p) => p.id === id);

  const [size, setSize] = useState(product?.sizes[0] || '');
  const [color, setColor] = useState(product?.colors[0]?.name || '');
  const [added, setAdded] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const [showNegotiate, setShowNegotiate] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh' }}>
        <p style={{ marginBottom: 16 }}>{t('product.notfound')}</p>
        <Button variant="glass" onClick={() => navigate('/')}>{t('product.back')}</Button>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    const tg = window.Telegram?.WebApp;
    tg?.HapticFeedback?.notificationOccurred('success');
  };

  const handleNegotiate = () => {
    if (!offerPrice || !product) return;
    const msg = `Здравствуйте, хочу предложить ${Number(offerPrice).toLocaleString()}₴ за товар "${product.name}" (${product.selectedSize || size}, ${color}).`;
    window.open(`https://t.me/certifiedclobot?text=${encodeURIComponent(msg)}`, '_blank');
    setShowNegotiate(false);
    setOfferPrice('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header showBack title="" />

      {showNegotiate && (
        <div ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) setShowNegotiate(false); }}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <Glass card style={{ width: '100%', maxWidth: 400, borderRadius: '24px 24px 0 0', padding: 24, paddingBottom: 40, animation: 'slideUp 0.3s ease' }}>
            <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, margin: '0 auto 16px' }} />
            <h3 style={{ font: 'var(--font-headline)', marginBottom: 16, textAlign: 'center' }}>{t('product.negotiate.title')}</h3>
            <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)', marginBottom: 16, textAlign: 'center' }}>
              {t('product.negotiate.subtitle')}
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input type="number" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)}
                placeholder={t('product.negotiate.placeholder')}
                style={{ flex: 1, padding: '14px 16px', borderRadius: 'var(--rounded-lg)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', font: 'var(--font-body)', color: 'var(--on-surface)', backdropFilter: 'blur(8px)' }} />
              <span style={{ display: 'flex', alignItems: 'center', font: 'var(--font-body)', color: 'var(--on-surface-variant)' }}>₴</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button variant="glass" onClick={() => setShowNegotiate(false)} style={{ flex: 1 }}>{t('product.back')}</Button>
              <Button fullWidth glow variant="primary" onClick={handleNegotiate} disabled={!offerPrice}>{t('product.negotiate.send')}</Button>
            </div>
          </Glass>
        </div>
      )}

      <main style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 10, paddingBottom: 32 }}>
        <section style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 24, paddingBottom: 24,
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 320, aspectRatio: '3/4' }}>
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(197,234,255,0.1)',
              borderRadius: '50%', filter: 'blur(60px)', transform: 'scale(0.75)', opacity: 0.5,
            }} />
            <img src={product.image} alt={product.name}
              style={{
                position: 'relative', zIndex: 10, width: '100%', height: '100%', objectFit: 'contain',
                transform: `translateY(${scrolled * 0.15}px) scale(${1 + scrolled * 0.0002})`,
                transition: 'transform 0.1s',
              }} />
          </div>
        </section>

        <section style={{ padding: '0 var(--pad)', marginTop: -32 }}>
          <Glass card style={{ borderRadius: 32, padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ font: 'var(--font-label)', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{t('categories.' + product.category)}</span>
                <h2 style={{ font: 'var(--font-display)', color: 'var(--on-surface)', marginTop: 4, fontSize: 28 }}>{product.name}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ font: 'var(--font-headline)', color: 'var(--primary)' }}>{product.price.toLocaleString()}₴</p>
                {product.originalPrice && (
                  <p style={{ textDecoration: 'line-through', color: 'var(--on-surface-variant)', font: 'var(--font-body-sm)' }}>{product.originalPrice.toLocaleString()}₴</p>
                )}
              </div>
            </div>

            <p style={{ font: 'var(--font-body)', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>{product.description}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ font: 'var(--font-label)', color: 'var(--on-surface)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {t('product.color')} — {color}
              </span>
              <div style={{ display: 'flex', gap: 12 }}>
                {product.colors.map((c) => (
                  <button key={c.name} onClick={() => setColor(c.name)}
                    style={{
                      width: 32, height: 32, borderRadius: '50%', background: c.hex,
                      border: color === c.name ? '2px solid var(--primary)' : '2px solid var(--outline-variant)',
                      boxShadow: color === c.name ? '0 0 12px rgba(197,234,255,0.3)' : 'none',
                      cursor: 'pointer',
                    }} />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ font: 'var(--font-label)', color: 'var(--on-surface)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {t('product.size')} — {size}
              </span>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    style={{
                      width: 48, height: 48, borderRadius: 'var(--rounded-lg)',
                      font: 'var(--font-body)', fontWeight: 600,
                      background: size === s ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(8px)', border: size === s ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                      color: size === s ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                      boxShadow: size === s ? '0 0 10px rgba(197,234,255,0.2)' : 'none',
                      cursor: 'pointer',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
              <Button fullWidth glow variant="primary" onClick={handleAdd}>
                {added ? t('product.added') : `${t('product.add')} — ${product.price.toLocaleString()}₴`}
              </Button>
              <Button fullWidth variant="glass" onClick={() => { setShowNegotiate(true); setOfferPrice(String(product.price)); }}>
                {t('product.negotiate')}
              </Button>
            </div>
          </Glass>
        </section>
      </main>
    </div>
  );
}
