import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Glass } from '../../components/Glass';
import { Icon } from '../../components/Icon';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export function AdminProducts() {
  const navigate = useNavigate();
  const { products, addProduct, deleteProduct } = useData();
  const { isAdmin } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  if (!isAdmin) return <div style={{ padding: 40, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh' }}><p>Access denied.</p></div>;

  const handleAdd = () => {
    if (!name || !price) return;
    addProduct({
      id: Date.now().toString(),
      name, category: category || 'General', price: Number(price),
      image: image || 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a11?w=400&q=80',
      description: description || '',
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Default', hex: '#000000' }],
    });
    setName(''); setCategory(''); setPrice(''); setImage(''); setDescription('');
    setShowForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header showBack title="Products" onBack={() => navigate('/admin')} />
      <main style={{ flex: 1, overflow: 'auto', padding: '20px var(--pad)', position: 'relative', zIndex: 10, paddingBottom: 96 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>{products.length} products</span>
          <Button variant="glass" onClick={() => setShowForm(!showForm)} style={{ padding: '8px 16px' }}>
            <Icon name="add" style={{ fontSize: 16 }} /> Add Product
          </Button>
        </div>

        {showForm && (
          <Glass card glow style={{ borderRadius: 'var(--rounded-lg)', padding: 20, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}
                style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
              <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                style={{ width: 120, padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
            </div>
            <input placeholder="Image URL (optional)" value={image} onChange={(e) => setImage(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)', resize: 'vertical' }} />
            <Button fullWidth glow variant="primary" onClick={handleAdd}>Add Product</Button>
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
                <p style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>{p.category} — ${p.price}</p>
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
