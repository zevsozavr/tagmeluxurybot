import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Glass } from '../../components/Glass';
import { Icon } from '../../components/Icon';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { products, offers } = useData();
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div style={{ padding: 40, textAlign: 'center', background: 'var(--bg)', minHeight: '100vh' }}>
        <p>Access denied.</p>
      </div>
    );
  }

  const cards = [
    { label: 'Products', value: products.length, icon: 'inventory_2', path: '/admin/products', color: 'var(--primary)' },
    { label: 'Active Offers', value: offers.filter((o) => o.active).length, icon: 'local_offer', path: '/admin/offers', color: 'var(--tertiary-dim)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header showBack title="Admin" onBack={() => navigate('/settings')} />
      <main style={{ flex: 1, overflow: 'auto', padding: '20px var(--pad)', position: 'relative', zIndex: 10 }}>
        <h2 style={{ font: 'var(--font-headline)', marginBottom: 20 }}>Dashboard</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {cards.map((card) => (
            <Glass key={card.path} glow style={{ borderRadius: 'var(--rounded-lg)', padding: 20, cursor: 'pointer' }}
              onClick={() => navigate(card.path)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon name={card.icon} style={{ color: card.color, fontSize: 28 }} />
                  <span style={{ font: 'var(--font-body)' }}>{card.label}</span>
                </div>
                <span style={{ font: 'var(--font-display)', color: card.color, fontSize: 28 }}>{card.value}</span>
              </div>
            </Glass>
          ))}
        </div>
      </main>
    </div>
  );
}
