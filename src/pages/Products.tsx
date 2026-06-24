import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { BottomBar } from '../components/BottomBar';
import { Glass } from '../components/Glass';
import { Icon } from '../components/Icon';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories } = useData();
  const { t } = useLang();
  const activeCategory = searchParams.get('category') || '';
  const [sort, setSort] = useState<SortKey>('default');
  const [showSort, setShowSort] = useState(false);

  const filtered = useMemo(() => {
    let list = activeCategory ? products.filter((p) => p.category === activeCategory) : [...products];
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': list.sort((a, b) => b.name.localeCompare(a.name)); break;
    }
    return list;
  }, [products, activeCategory, sort]);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'default', label: t('products.sort.default') },
    { key: 'price-asc', label: t('products.sort.price.asc') },
    { key: 'price-desc', label: t('products.sort.price.desc') },
    { key: 'name-asc', label: t('products.sort.name.asc') },
    { key: 'name-desc', label: t('products.sort.name.desc') },
  ];

  const currentSortLabel = sortOptions.find((o) => o.key === sort)?.label || t('products.sort.default');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header showBack title={t('products.title')} />

      <main style={{ flex: 1, overflow: 'auto', position: 'relative', zIndex: 10, padding: '0 var(--pad)', paddingTop: 16, paddingBottom: 96 }}>
        {/* Category filter chips */}
        <div style={{ display: 'flex', gap: 8, overflow: 'auto', scrollbarWidth: 'none', marginBottom: 16 }}>
          {categories.map((cat) => {
            const active = activeCategory === cat.name || (!activeCategory && cat.name === 'All');
            return (
              <button key={cat.id} onClick={() => {
                if (cat.name === 'All') { setSearchParams({}); return; }
                setSearchParams({ category: cat.name });
              }}
                style={{
                  flexShrink: 0, padding: '8px 18px', borderRadius: 'var(--radius-full)',
                  background: active ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  color: active ? 'var(--on-primary)' : 'var(--on-surface)',
                  font: 'var(--font-label)', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: active ? 600 : 400,
                }}>
                {t('categories.' + cat.name)}
              </button>
            );
          })}
        </div>

        {/* Sort + count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>{filtered.length} {t('products.count')}</span>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowSort(!showSort)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, font: 'var(--font-label)', color: 'var(--primary)', cursor: 'pointer', padding: '4px 8px' }}>
              <Icon name="sort" style={{ fontSize: 16 }} />
              {currentSortLabel}
            </button>
            {showSort && (
              <Glass style={{ position: 'absolute', top: '100%', right: 0, zIndex: 50, borderRadius: 'var(--rounded-lg)', padding: 8, minWidth: 200 }}>
                {sortOptions.map((opt) => (
                  <button key={opt.key} onClick={() => { setSort(opt.key); setShowSort(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px',
                      borderRadius: 'var(--rounded-md)', cursor: 'pointer',
                      background: sort === opt.key ? 'rgba(197,234,255,0.1)' : 'transparent',
                      font: 'var(--font-body)', color: sort === opt.key ? 'var(--primary)' : 'var(--on-surface)',
                      border: 'none', fontSize: 14,
                    }}>
                    {opt.label}
                  </button>
                ))}
              </Glass>
            )}
          </div>
        </div>

        {/* Product grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gutter)' }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => navigate(`/product/${p.id}`)} />
          ))}
        </div>
      </main>

      <BottomBar />
    </div>
  );
}
