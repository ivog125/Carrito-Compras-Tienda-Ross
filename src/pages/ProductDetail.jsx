import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { getCategoryById } from '../data/categories';
import { useCart } from '../context/CartContext'; // <-- import agregado

function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const category = product ? getCategoryById(product.category) : null;
  const { addToCart } = useCart(); // <-- hook agregado

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Producto no encontrado</h2>
        <Link to="/productos" style={{ color: '#2e7d32' }}>Volver a productos</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      <Link to="/productos" style={{ color: '#2e7d32', marginBottom: '2rem', display: 'inline-block' }}>
        ← Volver a productos
      </Link>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {/* Imagen */}
        <div>
          <img 
            src={`${import.meta.env.BASE_URL}${product.image}`}
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            onError={(e) => { e.target.src = '/placeholder.jpg' }}
          />
        </div>

        {/* Detalles */}
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{product.name}</h1>
          {category && (
            <Link 
              to={`/productos?categoria=${category.slug}`}
              style={{ color: '#2e7d32', textDecoration: 'none' }}
            >
              {category.name}
            </Link>
          )}
          
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2e7d32', margin: '1.5rem 0' }}>
            ${product.price.toLocaleString('es-CO')}
          </p>

          {product.description && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>
          )}

          {product.ingredients && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Ingredientes</h3>
              <p>{product.ingredients}</p>
            </div>
          )}

          {product.usage && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Modo de uso</h3>
              <p>{product.usage}</p>
            </div>
          )}

          {product.benefits && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Beneficios</h3>
              <p>{product.benefits}</p>
            </div>
          )}

          {/* Botón de agregar al carrito (ahora funcional) */}
          <button 
            onClick={() => addToCart(product)}
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;