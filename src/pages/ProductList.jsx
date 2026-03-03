import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { categories, getCategoryBySlug } from '../data/categories';
import ProductCard from '../components/ProductCard';

function ProductList() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('categoria');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    if (categorySlug) {
      const category = getCategoryBySlug(categorySlug);
      setCurrentCategory(category);
      if (category) {
        setFilteredProducts(products.filter(p => p.category === category.id));
      } else {
        setFilteredProducts([]);
      }
    } else {
      setCurrentCategory(null);
      setFilteredProducts(products);
    }
  }, [categorySlug]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>
        {currentCategory ? `Categoría: ${currentCategory.name}` : 'Todos los productos'}
      </h1>
      
      {/* Filtro de categorías (opcional) */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a 
          href="/productos" 
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: !categorySlug ? '#2e7d32' : '#f0f0f0',
            color: !categorySlug ? 'white' : '#333',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Todos
        </a>
        {categories.map(cat => (
          <a
            key={cat.id}
            href={`/productos?categoria=${cat.slug}`}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: categorySlug === cat.slug ? '#2e7d32' : '#f0f0f0',
              color: categorySlug === cat.slug ? 'white' : '#333',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            {cat.name}
          </a>
        ))}
      </div>

      {/* Grid de productos */}
      {filteredProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No hay productos en esta categoría.</p>
      )}
    </div>
  );
}

export default ProductList;