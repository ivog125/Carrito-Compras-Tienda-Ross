import { Link } from 'react-router-dom';

function Failure() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
      <h1 style={{ color: '#d32f2f', marginBottom: '1rem' }}>Ups, algo salió mal</h1>
      <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
        No se pudo completar el pago. Puede deberse a fondos insuficientes o datos incorrectos.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link 
          to="/checkout" 
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#2e7d32',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Intentar de nuevo
        </Link>
        <Link 
          to="/productos" 
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: 'transparent',
            color: '#2e7d32',
            textDecoration: 'none',
            borderRadius: '4px',
            border: '1px solid #2e7d32'
          }}
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}

export default Failure;