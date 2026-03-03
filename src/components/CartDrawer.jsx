import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Calcular subtotal por producto (precio * cantidad)
  const calculateSubtotal = (item) => item.price * item.quantity;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
        }}
      />
      
      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '450px',
          maxWidth: '100%',
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
          zIndex: 1001,
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#2e7d32' }}>Tu Carrito</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ✕
          </button>
        </div>

        {/* Contenido del carrito */}
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '3rem', color: '#666' }}>
            <p>Tu carrito está vacío</p>
            <button
              onClick={onClose}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#2e7d32',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            {/* Lista de productos con subtotales */}
            <div style={{ flex: 1 }}>
              {cart.map(item => {
                const subtotal = calculateSubtotal(item);
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem 0',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    {/* Imagen pequeña */}
                    <img
                      src={`/${item.image}`}
                      alt={item.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                      onError={(e) => { e.target.src = '/placeholder.jpg' }}
                    />
                    
                    {/* Detalles del producto */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                      
                      {/* Precio unitario y subtotal en la misma línea */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#666' }}>Precio unitario:</span>
                        <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                          ${item.price.toLocaleString('es-CO')}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#666' }}>Subtotal:</span>
                        <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                          ${subtotal.toLocaleString('es-CO')}
                        </span>
                      </div>
                      
                      {/* Control de cantidad */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            padding: '0.2rem 0.5rem',
                            backgroundColor: '#f0f0f0',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          -
                        </button>
                        <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            padding: '0.2rem 0.5rem',
                            backgroundColor: '#f0f0f0',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            marginLeft: '0.5rem',
                            padding: '0.2rem 0.5rem',
                            backgroundColor: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer con total general y botón de pago */}
            <div style={{ marginTop: '1.5rem', borderTop: '2px solid #eee', paddingTop: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '1.3rem', 
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                <span>Total general:</span>
                <span style={{ color: '#2e7d32' }}>${getTotalPrice().toLocaleString('es-CO')}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                Impuestos incluidos. Envío calculado al finalizar.
              </p>
              <button
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '1rem',
                  backgroundColor: '#2e7d32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1.1rem',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartDrawer;