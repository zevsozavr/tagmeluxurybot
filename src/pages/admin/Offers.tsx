import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Glass } from '../../components/Glass';
import { Icon } from '../../components/Icon';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export function AdminOffers() {
  const navigate = useNavigate();
  const { offers, addOffer, toggleOffer, deleteOffer } = useData();
  const { isAdmin } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [discount, setDiscount] = useState('');
  const [code, setCode] = useState('');

  if (!isAdmin) return <div style={{ padding: 40, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh' }}><p>Access denied.</p></div>;

  const handleAdd = () => {
    if (!title) return;
    addOffer({ id: Date.now().toString(), title, description: desc, discount: Number(discount) || 0, code: code || '', active: true });
    setTitle(''); setDesc(''); setDiscount(''); setCode(''); setShowForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header showBack title="Offers" onBack={() => navigate('/admin')} />
      <main style={{ flex: 1, overflow: 'auto', padding: '20px var(--pad)', position: 'relative', zIndex: 10, paddingBottom: 96 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>{offers.filter((o) => o.active).length} active</span>
          <Button variant="glass" onClick={() => setShowForm(!showForm)} style={{ padding: '8px 16px' }}>
            <Icon name="add" style={{ fontSize: 16 }} /> Add Offer
          </Button>
        </div>

        {showForm && (
          <Glass card glow style={{ borderRadius: 'var(--rounded-lg)', padding: 20, marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input placeholder="Offer Title" value={title} onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
            <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <input placeholder="Discount %" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)}
                style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
              <input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)}
                style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--rounded-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', font: 'var(--font-body)', color: 'var(--on-surface)' }} />
            </div>
            <Button fullWidth glow variant="primary" onClick={handleAdd}>Add Offer</Button>
          </Glass>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {offers.map((o) => (
            <Glass key={o.id} style={{ borderRadius: 'var(--rounded-lg)', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ font: 'var(--font-body)', fontWeight: 600 }}>{o.title}</p>
                <p style={{ font: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>{o.description} {o.code && <span style={{ color: 'var(--tertiary-dim)' }}>— {o.code}</span>}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => toggleOffer(o.id)} style={{
                  padding: '6px 12px', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                  background: o.active ? 'rgba(125,211,252,0.2)' : 'rgba(255,180,171,0.2)',
                  border: `1px solid ${o.active ? 'rgba(125,211,252,0.3)' : 'rgba(255,180,171,0.3)'}`,
                  color: o.active ? 'var(--primary)' : 'var(--error)', textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  {o.active ? 'Active' : 'Inactive'}
                </button>
                <button onClick={() => deleteOffer(o.id)} style={{ color: 'var(--error)', cursor: 'pointer', padding: 4 }}>
                  <Icon name="delete" />
                </button>
              </div>
            </Glass>
          ))}
        </div>
      </main>
    </div>
  );
}
