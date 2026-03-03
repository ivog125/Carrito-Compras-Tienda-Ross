import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard'; // Importamos el componente

function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero section */}
      <section style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '3rem 1rem',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2e7d32', marginBottom: '1rem' }}>
          Bienvenidos a Tienda Ross
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Productos orgánicos y naturales para tu bienestar. Descubre nuestra selección de extractos, hierbas, algas y más.
        </p>
        <Link 
          to="/productos" 
          style={{
            display: 'inline-block',
            marginTop: '2rem',
            padding: '0.75rem 2rem',
            backgroundColor: '#2e7d32',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Ver todos los productos
        </Link>
      </section>

      {/* Categorías destacadas */}
      <section style={{ padding: '0 1rem 2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Categorías</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/productos?categoria=${category.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                textAlign: 'center'
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
              <h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>{category.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section style={{ padding: '2rem 1rem', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Productos destacados</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;