import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CartProvider } from './context/CartContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import { initMercadoPago } from '@mercadopago/sdk-react'

// Inicializar Mercado Pago con tu Public Key de prueba
// IMPORTANTE: Reemplaza 'TEST-1234567890-...' con tu clave pública real de Mercado Pago
initMercadoPago('TEST-1234567890-...')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
)