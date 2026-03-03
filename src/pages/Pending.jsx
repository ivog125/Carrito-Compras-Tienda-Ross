import { Link } from 'react-router-dom';

function Pending() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏳</div>
      <h1 style={{ color: '#ff9800', marginBottom: '1rem' }}>Pago pendiente</h1>
      <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
        Estamos esperando la confirmación de tu pago. Te notificaremos por correo cuando se acredite.
      </p>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        No cierres esta ventana mientras se procesa el pago.
      </p>
      <Link 
        to="/productos" 
        style={{
          padding: '0.75rem 2rem',
          backgroundColor: '#2e7d32',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        Seguir comprando
      </Link>
    </div>
  );
}

export default Pending;