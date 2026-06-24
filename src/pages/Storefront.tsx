import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { BottomBar } from '../components/BottomBar';
import { categories, products } from '../data';

export function Storefront() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-background)' }}>
      <Header right={
        <button onClick={() => navigate('/cart')} style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'var(--glass-bg)', border: '1px solid var(--color-outline-variant)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', cursor: 'pointer',
        }}>
          ◈
        </button>
      } />

      <main style={{ flex: 1, overflow: 'auto', paddingBottom: 'var(--safe-area-bottom)' }}>
        <section style={{ margin: '0 var(--container-padding)', marginTop: '20px' }}>
          <div
            style={{
              borderRadius: 'var(--rounded-xl)',
              overflow: 'hidden',
              aspectRatio: '16 / 9',
              background: 'var(--color-surface-container-low)',
              position: 'relative',
              border: '1px solid var(--color-outline-variant)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"
              alt="Spring Collection"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,19,38,0.9) 0%, transparent 60%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px 20px',
              }}
            >
              <span style={{ font: 'var(--typography-label-caps)', color: 'var(--color-primary)', marginBottom: '4px', display: 'block' }}>
                NEW SEASON
              </span>
              <h2 style={{ font: 'var(--typography-display-lg)', fontSize: '32px', color: '#fff', marginBottom: '4px' }}>
                Spring Collection
              </h2>
              <p style={{ font: 'var(--typography-body-lg)', color: 'var(--color-on-surface-variant)' }}>
                Discover the season's essentials
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 var(--container-padding)', marginBottom: '12px' }}>
            <h2 style={{ font: 'var(--typography-headline-sm)' }}>Categories</h2>
            <button style={{ font: 'var(--typography-label-caps)', color: 'var(--color-primary)' }}>
              View All
            </button>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflow: 'auto', padding: '0 var(--container-padding)', scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} onClick={() => navigate('/')} />
            ))}
          </div>
        </section>

        <section style={{ marginTop: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 var(--container-padding)', marginBottom: '12px' }}>
            <h2 style={{ font: 'var(--typography-headline-sm)' }}>New In</h2>
            <button style={{ font: 'var(--typography-label-caps)', color: 'var(--color-primary)' }}>
              View All
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--grid-gutter)', padding: '0 var(--container-padding)' }}>
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
            ))}
          </div>
        </section>
      </main>

      <BottomBar />
    </div>
  );
}
