import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { BottomBar } from '../components/BottomBar';
import { categories, products } from '../data';

export function Storefront() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header right={
        <button onClick={() => navigate('/cart')} style={{ fontSize: '18px', padding: '4px' }}>
          ◈
        </button>
      } />

      <main style={{ flex: 1, overflow: 'auto', paddingBottom: '16px' }}>
        <section style={{ margin: '0 var(--container-margin)', marginTop: '24px' }}>
          <div
            style={{
              borderRadius: 'var(--rounded-lg)',
              overflow: 'hidden',
              aspectRatio: '16 / 9',
              background: 'var(--color-surface-container-low)',
              position: 'relative',
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
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
              }}
            >
              <h2 style={{ font: 'var(--typography-headline-lg-mobile)', color: '#fff', marginBottom: '4px' }}>
                Spring Collection
              </h2>
              <p style={{ font: 'var(--typography-body-md)', color: 'rgba(255,255,255,0.8)' }}>
                Discover the season's essentials
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 var(--container-margin)', marginBottom: '12px' }}>
            <h2 style={{ font: 'var(--typography-headline-md)' }}>Categories</h2>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflow: 'auto', padding: '0 var(--container-margin)', scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} onClick={() => navigate('/')} />
            ))}
          </div>
        </section>

        <section style={{ marginTop: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 var(--container-margin)', marginBottom: '12px' }}>
            <h2 style={{ font: 'var(--typography-headline-md)' }}>New In</h2>
            <button style={{ font: 'var(--typography-label-sm)', color: 'var(--color-on-surface-variant)' }}>
              View All
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gutter)', padding: '0 var(--container-margin)' }}>
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
