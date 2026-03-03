import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

function Checkout() {
  const { cart, getTotalPrice } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const crearPreferencia = async () => {
    if (!formData.email) {
      alert('Por favor ingresa tu email');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/create-preference`, {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        payerEmail: formData.email
      });
      setPreferenceId(response.data.preferenceId);
    } catch (error) {
      console.error('Error creando preferencia:', error);
      alert('Error al iniciar el pago. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Tu carrito está vacío</h2>
        <a href="/productos" style={{ color: '#2e7d32' }}>Ir a comprar</a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ color: '#2e7d32' }}>Finalizar compra</h1>
      
      {/* Formulario de datos del comprador */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>Datos de contacto</h3>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
      </div>

      {/* Resumen del pedido */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3>Resumen de tu compra</h3>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toLocaleString('es-CO')}</span>
          </div>
        ))}
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span style={{ color: '#2e7d32' }}>${getTotalPrice().toLocaleString('es-CO')}</span>
        </div>
      </div>

      {/* Botón para crear preferencia y pagar */}
      {!preferenceId ? (
        <button
          onClick={crearPreferencia}
          disabled={loading || !formData.email}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#2e7d32',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1.2rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Procesando...' : 'Continuar al pago'}
        </button>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}
    </div>
  );
}

export default Checkout;