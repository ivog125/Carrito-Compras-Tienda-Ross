const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://ivog125.github.io']
}));
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, payerEmail } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío o los datos son inválidos' });
    }

    const preference = new Preference(client);
    const body = {
      items: items.map(item => ({
        title: item.name,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: 'COP' // Cambia según tu país
      })),
      payer: {
        email: payerEmail || 'test_user@example.com'
      },
      back_urls: {
        success: 'https://ivog125.github.io/Carrito-Compras-Tienda-Ross/success',
        failure: 'https://ivog125.github.io/Carrito-Compras-Tienda-Ross/failure',
        pending: 'https://ivog125.github.io/Carrito-Compras-Tienda-Ross/pending'
      },
      auto_return: 'approved'
    };

    const response = await preference.create({ body });
    res.json({
      preferenceId: response.id,
      initPoint: response.init_point
    });

  } catch (error) {
    console.error('Error creando preferencia:', error);
    res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});