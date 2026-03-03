import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    notas: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Si el carrito está vacío, redirigir a productos
  if (cart.length === 0 && !orderCompleted) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/productos" style={{ color: '#2e7d32' }}>Ir a comprar</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular proceso de pago/confirmación
    setTimeout(() => {
      setIsProcessing(false);
      setOrderCompleted(true);
      clearCart(); // Vaciar carrito después de la compra
    }, 2000);
  };

  if (orderCompleted) {
    return (
      <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: '#2e7d32', marginBottom: '1rem' }}>¡Gracias por tu compra!</h2>
        <p style={{ marginBottom: '2rem' }}>Tu pedido ha sido procesado exitosamente.</p>
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

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Finalizar compra</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Formulario de datos */}
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>Datos de envío</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Nombre completo *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Dirección *</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Ciudad *</label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Notas adicionales</label>
              <textarea
                name="notas"
                value={formData.notas}
                onChange={handleInputChange}
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: isProcessing ? '#ccc' : '#2e7d32',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1.1rem',
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? 'Procesando...' : 'Confirmar compra'}
            </button>
          </form>
        </div>

        {/* Resumen del pedido */}
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>Resumen del pedido</h2>
          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '1.5rem',
            borderRadius: '8px'
          }}>
            {cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #ddd'
              }}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                  <span style={{ color: '#666', marginLeft: '0.5rem' }}>x{item.quantity}</span>
                </div>
                <span>${(item.price * item.quantity).toLocaleString('es-CO')}</span>
              </div>
            ))}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              <span>Total:</span>
              <span style={{ color: '#2e7d32' }}>${getTotalPrice().toLocaleString('es-CO')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;