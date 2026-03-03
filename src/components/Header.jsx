import { Link } from 'react-router-dom';
import './Header.css'; 
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🍃 Orgánico Market</Link>
      </div>
      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
      </nav>
    </header>
  );
};

export default Header;