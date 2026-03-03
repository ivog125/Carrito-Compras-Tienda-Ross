import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Success() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Vaciar carrito después de una compra exitosa
    clearCart();
    
    // Opcional: Redirigir después de unos segundos
    const timer = setTimeout(() => {
      navigate('/productos');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [clearCart, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
      <h1 style={{ color: '#2e7d32', marginBottom: '1rem' }}>¡Gracias por tu compra!</h1>
      <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>
        Tu pedido ha sido procesado exitosamente. Pronto recibirás un correo con los detalles.
      </p>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Serás redirigido a la tienda en 5 segundos...
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

export default Success;