import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', color: '#2e7d32' }}>404</h1>
      <h2 style={{ marginBottom: '2rem' }}>Página no encontrada</h2>
      <p style={{ marginBottom: '2rem' }}>Lo sentimos, la página que buscas no existe.</p>
      <Link 
        to="/" 
        style={{
          padding: '0.75rem 2rem',
          backgroundColor: '#2e7d32',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;