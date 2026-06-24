import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { BottomBar } from '../components/BottomBar';
import { Glass } from '../components/Glass';
import { Icon } from '../components/Icon';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';

export function Storefront() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { products, categories } = useData();
  const productsRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header right={
        <button onClick={() => navigate('/cart')} style={{ color: 'var(--primary)', position: 'relative', display: 'flex', padding: 4 }}>
          <Icon name="shopping_bag" style={{ fontSize: 24 }} />
          {totalItems > 0 && (
            <span style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: 'var(--primary-container)' }} />
          )}
        </button>
      } />

      <main style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 10, paddingTop: 16, paddingBottom: 96 }}>
        <div style={{ padding: '0 var(--pad)' }}>
          <div style={{ font: 'var(--font-label)', color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Магазин</div>

          {/* Hero */}
          <section style={{
            position: 'relative', height: 420, borderRadius: 'var(--rounded-xl)',
            overflow: 'hidden', marginTop: 8,
          }}>
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80" alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,19,38,0.8), transparent)' }} />
            <Glass glow style={{ position: 'absolute', bottom: 24, left: 24, right: 24, padding: 24, borderRadius: 'var(--rounded-lg)' }}>
              <p style={{ font: 'var(--font-label)', color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>Нова колекція</p>
              <h2 style={{ font: 'var(--font-display)', color: 'var(--on-surface)', marginBottom: 16 }}>WINTER DROP</h2>
              <button onClick={scrollToProducts}
                style={{ width: '100%', background: 'var(--primary)', color: 'var(--on-primary)', padding: '12px 0', borderRadius: 'var(--radius-full)', font: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
                ДИВИТИСЯ
              </button>
            </Glass>
          </section>

          {/* Categories */}
          <section style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ font: 'var(--font-headline)', fontSize: 18 }}>Категорії</h3>
              <span onClick={() => navigate('/products')} style={{ font: 'var(--font-label)', color: 'var(--primary)', borderBottom: '1px solid rgba(197,234,255,0.3)', paddingBottom: 2, cursor: 'pointer' }}>Всі</span>
            </div>
            <div style={{ display: 'flex', gap: 10, overflow: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
              {categories.filter((c) => c.name !== 'All').map((cat) => (
                <button key={cat.id} onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
                  style={{
                    flexShrink: 0, padding: '8px 18px', borderRadius: 'var(--radius-full)',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)', font: 'var(--font-label)', color: 'var(--on-surface)',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                  }}>
                  {cat.name}
                </button>
              ))}
            </div>
          </section>

          {/* Products */}
          <section ref={productsRef} style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ font: 'var(--font-headline)', fontSize: 18 }}>Товари</h3>
              <span onClick={() => navigate('/products')} style={{ font: 'var(--font-label)', color: 'var(--primary)', borderBottom: '1px solid rgba(197,234,255,0.3)', paddingBottom: 2, cursor: 'pointer' }}>Всі</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gutter)' }}>
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <section style={{ marginTop: 40 }}>
            <Glass card glow style={{ padding: 32, borderRadius: 'var(--rounded-xl)', textAlign: 'center' }}>
              <h4 style={{ font: 'var(--font-headline)', marginBottom: 8 }}>Будь в курсі</h4>
              <p style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)', marginBottom: 24 }}>
                Ексклюзивні пропозиції та новинки першими.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input placeholder="Email" type="email"
                  style={{
                    width: '100%', padding: '12px 24px', borderRadius: 'var(--radius-full)',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--on-surface)', fontSize: 14,
                  }} />
                <button style={{
                  width: '100%', background: 'var(--primary)', color: 'var(--on-primary)',
                  padding: '12px 0', borderRadius: 'var(--radius-full)',
                  font: 'var(--font-label)', fontWeight: 600, border: 'none', cursor: 'pointer',
                }}>ПІДПИСАТИСЯ</button>
              </div>
            </Glass>
          </section>
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
