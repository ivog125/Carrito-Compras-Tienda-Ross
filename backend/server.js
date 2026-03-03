const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'https://ivog125.github.io']
}));
app.use(express.json());

// Configurar Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

// Endpoint para crear preferencia de pago
app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, payerEmail } = req.body;

    // Log para ver qué está llegando
    console.log('📦 Datos recibidos:', JSON.stringify(req.body, null, 2));

    // Validaciones básicas
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log('❌ Error: items vacío o no es un array');
      return res.status(400).json({ error: 'El carrito está vacío o los datos son inválidos' });
    }

    // Validar cada item
    for (const item of items) {
      if (!item.name || !item.price || !item.quantity) {
        console.log('❌ Error: item incompleto', item);
        return res.status(400).json({ error: 'Cada producto debe tener nombre, precio y cantidad' });
      }
    }

    // Construir la preferencia
    const preference = new Preference(client);
    const body = {
      items: items.map(item => ({
        title: item.name,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: 'ARS' // Cambiado a ARS porque es Argentina (antes era COP)
      })),
      payer: {
        email: payerEmail || 'test_user_123456@testuser.com' // Email de prueba válido
      },
      back_urls: {
        success: 'https://ivog125.github.io/Carrito-Compras-Tienda-Ross/success',
        failure: 'https://ivog125.github.io/Carrito-Compras-Tienda-Ross/failure',
        pending: 'https://ivog125.github.io/Carrito-Compras-Tienda-Ross/pending'
      },
      auto_return: 'approved'
    };

    console.log('🚀 Enviando a Mercado Pago:', JSON.stringify(body, null, 2));

    const response = await preference.create({ body });
    
    console.log('✅ Preferencia creada:', response.id);
    res.json({
      preferenceId: response.id,
      initPoint: response.init_point
    });

  } catch (error) {
    // Log detallado del error
    console.error('🔥 Error en create-preference:');
    if (error.response) {
      // Error con respuesta de Mercado Pago
      console.error('🔴 Status:', error.response.status);
      console.error('🔴 Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      // No hubo respuesta
      console.error('🔴 No se recibió respuesta de Mercado Pago');
    } else {
      // Error en la configuración
      console.error('🔴 Error interno:', error.message);
    }
    console.error('🔴 Stack:', error.stack);

    res.status(500).json({ 
      error: 'Error al crear preferencia de pago',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en puerto ${PORT}`);
  console.log('🔑 Access Token configurado:', process.env.MERCADO_PAGO_ACCESS_TOKEN ? 'SÍ' : 'NO');
});