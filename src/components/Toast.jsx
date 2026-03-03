import { useEffect, useState } from 'react';

function Toast({ show, message, productName, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto-cerrar después de 3 segundos
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header" style={{ backgroundColor: '#2e7d32', color: 'white' }}>
          <strong className="me-auto">🛒 Tienda Ross</strong>
          <small>ahora mismo</small>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            aria-label="Cerrar"
          ></button>
        </div>
        <div className="toast-body d-flex align-items-center gap-2">
          <span style={{ fontSize: '1.2rem' }}>✅</span>
          <div>
            <strong>{productName}</strong>
            <p className="mb-0 text-muted">{message}</p>
          </div>
        </div>
      </div>

      {/* Estilos para la animación */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Toast;