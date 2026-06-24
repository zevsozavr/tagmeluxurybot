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
        padding: '40px var(--container-margin)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--color-primary-container)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <span style={{ fontSize: '28px', color: 'var(--color-on-primary-container)' }}>✓</span>
      </div>
      <h1 style={{ font: 'var(--typography-headline-lg-mobile)', marginBottom: '8px' }}>
        Order Confirmed
      </h1>
      <p style={{ font: 'var(--typography-body-md)', color: 'var(--color-on-surface-variant)', marginBottom: '32px', maxWidth: '280px' }}>
        Thank you for your purchase. You will receive a confirmation shortly.
      </p>
      <Button onClick={() => navigate('/')}>Continue Shopping</Button>
    </div>
  );
}
