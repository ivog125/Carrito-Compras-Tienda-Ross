import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/imageUtils';

function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

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
            {/* Lista de productos - diseño tipo tabla */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {/* Cabecera de la tabla */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 40px',
                gap: '0.5rem',
                padding: '0.5rem 0',
                borderBottom: '2px solid #2e7d32',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                color: '#555'
              }}>
                <span>Producto</span>
                <span style={{ textAlign: 'center' }}>Precio</span>
                <span style={{ textAlign: 'center' }}>Cant.</span>
                <span style={{ textAlign: 'center' }}>Subtotal</span>
                <span></span>
              </div>

              {/* Productos */}
              {cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 40px',
                    gap: '0.5rem',
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {/* Producto con imagen y nombre */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                      onError={(e) => { e.target.src = getImageUrl('placeholder.jpg') }}
                    />
                    <span style={{ fontSize: '0.9rem' }}>{item.name}</span>
                  </div>

                  {/* Precio unitario */}
                  <span style={{ textAlign: 'center', fontWeight: '500' }}>
                    ${item.price.toLocaleString('es-CO')}
                  </span>

                  {/* Control de cantidad */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        padding: '0.2rem 0.5rem',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '28px'
                      }}
                    >
                      -
                    </button>
                    <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        padding: '0.2rem 0.5rem',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '28px'
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <span style={{ textAlign: 'center', fontWeight: 'bold', color: '#2e7d32' }}>
                    ${(item.price * item.quantity).toLocaleString('es-CO')}
                  </span>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff4444',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Footer con total y botón de pago */}
            <div style={{ marginTop: '1.5rem', borderTop: '2px solid #2e7d32', paddingTop: '1rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                <span>Total general:</span>
                <span style={{ color: '#2e7d32', fontSize: '1.4rem' }}>
                  ${getTotalPrice().toLocaleString('es-CO')}
                </span>
              </div>
              
              <button
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#2e7d32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1.1rem',
                  cursor: 'pointer'
                }}
                onClick={handleCheckout}
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