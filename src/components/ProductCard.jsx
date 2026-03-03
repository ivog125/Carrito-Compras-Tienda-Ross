import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    // Ya no mostramos alert, el toast se encarga
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <img 
        src={`/${product.image}`} 
        alt={product.name}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        onError={(e) => { e.target.src = '/placeholder.jpg' }}
      />
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{product.name}</h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2e7d32', margin: '0 0 1rem' }}>
          ${product.price.toLocaleString('es-CO')}
        </p>
        
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link 
            to={`/producto/${product.id}`}
            style={{
              padding: '0.5rem',
              backgroundColor: 'transparent',
              color: '#2e7d32',
              textDecoration: 'none',
              borderRadius: '4px',
              textAlign: 'center',
              border: '1px solid #2e7d32'
            }}
          >
            Ver detalles
          </Link>
          
          <button
            onClick={handleAddToCart}
            style={{
              padding: '0.5rem',
              backgroundColor: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1b5e20'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2e7d32'}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;