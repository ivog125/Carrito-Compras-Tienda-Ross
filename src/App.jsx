import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Success from './pages/Success';
import Failure from './pages/Failure';
import Pending from './pages/Pending';

function App() {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false); // <-- estado para abrir/cerrar

  return (
    <BrowserRouter basename='/Carrito-Compras-Tienda-Ross'>
      <div>
        {/* Barra de navegación */}
        <nav style={{ 
          padding: '1rem', 
          borderBottom: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* Nombre de la tienda como enlace a inicio */}
          <Link to="/" style={{ 
            textDecoration: 'none', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            color: '#2e7d32'
          }}>
            Tienda Ross
          </Link>
          
          {/* Enlace a productos */}
          <Link to="/productos" style={{ 
            textDecoration: 'none', 
            fontSize: '1.2rem',
            color: '#333'
          }}>
            Productos
          </Link>

          <Link to="/about" style={{ textDecoration: 'none', fontSize: '1.2rem', color: '#333' }}>
            Sobre Nosotros
          </Link>

          {/* Carrito con badge - ahora abre el drawer al hacer clic */}
          <div 
            style={{ marginLeft: 'auto', position: 'relative', cursor: 'pointer' }}
            onClick={() => setIsCartOpen(true)} // <-- abrir drawer
          >
            <span style={{ fontSize: '1.8rem' }}>🛒</span>
            {getTotalItems() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-10px',
                backgroundColor: '#2e7d32',
                color: 'white',
                borderRadius: '50%',
                padding: '0.2rem 0.5rem',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {getTotalItems()}
              </span>
            )}
          </div>
        </nav>

        {/* Contenido principal */}
        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
            <Route path="/pending" element={<Pending />} />
          </Routes>
        </main>

        {/* Drawer del carrito */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </BrowserRouter>
  );
}

export default App;