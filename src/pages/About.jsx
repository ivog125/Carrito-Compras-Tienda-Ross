import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ color: '#2e7d32', marginBottom: '1.5rem' }}>Sobre Nosotros</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tienda Ross</h2>
        <p style={{ lineHeight: '1.8', marginBottom: '1rem' }}>
          Somos una tienda especializada en productos orgánicos y naturales, comprometidos con tu bienestar 
          y el cuidado del medio ambiente. Desde nuestros inicios, nos hemos dedicado a seleccionar los mejores 
          productos, trabajando directamente con productores locales y marcas que comparten nuestra filosofía 
          de vida saludable y sostenible.
        </p>
        <p style={{ lineHeight: '1.8', marginBottom: '1rem' }}>
          Creemos en el poder de la naturaleza para mejorar nuestra calidad de vida. Por eso, cada producto 
          que ofrecemos ha sido cuidadosamente evaluado para garantizar su pureza, origen orgánico y beneficios 
          reales para tu salud.
        </p>
        <p style={{ lineHeight: '1.8' }}>
          Nuestro equipo está formado por apasionados de la vida natural, siempre dispuestos a asesorarte 
          y ayudarte a encontrar lo que necesitas. ¡Gracias por confiar en nosotros!
        </p>
      </section>

      <section style={{ 
        backgroundColor: '#f9f9f9', 
        padding: '2rem', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2e7d32' }}>Contacto</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>📍 Dirección</h3>
          <p>Calle 123 #45-67, Barrio Centro</p>
          <p>Medellín, Colombia</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>📞 Teléfonos</h3>
          <p>Línea de atención: +57 123 456 7890</p>
          <p>WhatsApp: +57 098 765 4321</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>✉️ Email</h3>
          <p>info@tiendaross.com</p>
          <p>pedidos@tiendaross.com</p>
        </div>

        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🕒 Horario de atención</h3>
          <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
          <p>Sábados: 9:00 AM - 1:00 PM</p>
          <p>Domingos y festivos: Cerrado</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>¿Tienes alguna pregunta?</h2>
        <p style={{ marginBottom: '1.5rem' }}>No dudes en contactarnos, estaremos encantados de ayudarte.</p>
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
          Ver productos
        </Link>
      </section>
    </div>
  );
}

export default About;