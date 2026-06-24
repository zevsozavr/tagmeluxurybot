import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export function OrderConfirmed() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px var(--container-padding)',
        textAlign: 'center',
        background: 'var(--color-background)',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 0 30px rgba(82,141,255,0.3)',
        }}
      >
        <span style={{ fontSize: '32px', color: '#fff' }}>✓</span>
      </div>
      <h1 style={{ font: 'var(--typography-headline-md)', marginBottom: '8px', color: 'var(--color-on-surface)' }}>
        Order Confirmed
      </h1>
      <p style={{ font: 'var(--typography-body-lg)', color: 'var(--color-on-surface-variant)', marginBottom: '32px', maxWidth: '280px' }}>
        Thank you for your purchase. You will receive a confirmation shortly.
      </p>
      <Button onClick={() => navigate('/')}>Continue Shopping</Button>
    </div>
  );
}
