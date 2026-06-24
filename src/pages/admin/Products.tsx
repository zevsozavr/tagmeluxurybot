import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Glass } from '../../components/Glass';
import { Icon } from '../../components/Icon';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';

export function AdminProducts() {
  const navigate = useNavigate();
  const { products, categories, addProduct, deleteProduct } = useData();
  const { isAdmin } = useAuth();
  const { t } = useLang();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  if (!isAdmin) return <div style={{ padding: 40, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh' }}><p>{t('admin.access.denied')}</p></div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!name || !price) return;
    const cat = category || newCategory || 'General';
    addProduct({
      id: Date.now().toString(),
      name, category: cat, price: Number(price),
      image: imageDataUrl || imageUrl || 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a11?w=400&q=80',
      description: description || '',
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Default', hex: '#000000' }],
    });
    setName(''); setCategory(''); setNewCategory(''); setPrice('');
    setImageDataUrl(''); setImageUrl(''); setDescription('');
    setShowForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header showBack title={t('admin.products')} onBack={() => navigate('/admin')} />
      <main style={{ flex: 1, overflow: 'auto', padding: '20px var(--pad)', position: 'relative', zIndex: 10, paddingBottom: 96 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>{products.length} {t('products.count')}</span>
          <Button variant="glass" onClick={() => setShowForm(!showForm)} style={{ padding: '8px 16px' }}>
            <Icon name="add" style={{ fontSize: 16 }} /> {t('admin.add.product')}
          </Button>
        </div>

        {showForm && (
          <Glass card glow style={{ borderRadius: 'var(--rounded-lg)', padding: 20, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input placeholder={t('admin.product.name')} value={name} onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />

            <select value={category} onChange={(e) => { setCategory(e.target.value); if (e.target.value !== '__new__') setNewCategory(''); }}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }}>
              <option value="">— {t('admin.product.category')} —</option>
              {categories.filter((c) => c.name !== 'All').map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
              <option value="__new__">+ {t('admin.product.category')}...</option>
            </select>

            {category === '__new__' && (
              <input placeholder={t('admin.product.category')} value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <input placeholder={t('admin.product.price')} type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
            </div>

            <div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange}
                style={{ width: '100%', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
              {!imageDataUrl && (
                <input placeholder={t('admin.product.photo.placeholder')} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                  style={{ width: '100%', marginTop: 8, padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
              )}
              {imageDataUrl && (
                <div style={{ marginTop: 8, width: 80, height: 100, borderRadius: 'var(--rounded-md)', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                  <img src={imageDataUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <textarea placeholder={t('admin.product.description')} value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)', resize: 'vertical' }} />
            <Button fullWidth glow variant="primary" onClick={handleAdd}>{t('admin.product.add')}</Button>
          </Glass>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {products.map((p) => (
            <Glass key={p.id} style={{ borderRadius: 'var(--rounded-lg)', padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 56, height: 72, borderRadius: 'var(--rounded-md)', overflow: 'hidden', flexShrink: 0, background: 'var(--surface-low)' }}>
                <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ font: 'var(--font-body)', fontWeight: 600 }}>{p.name}</p>
                <p style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>{t('categories.' + p.category)} — {p.price.toLocaleString()}₴</p>
              </div>
              <button onClick={() => deleteProduct(p.id)} style={{ color: 'var(--error)', cursor: 'pointer', padding: 4 }}>
                <Icon name="delete" />
              </button>
            </Glass>
          ))}
        </div>
      </main>
    </div>
  );
}
