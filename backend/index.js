require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database');

// 📡 Rutas importadas
const authRoutes = require('./routes/auth.routes');
const mascotasRoutes = require('./routes/mascotas.routes');
const partidaRoutes = require('./routes/partida.routes');

// 🧱 Middlewares
app.use(cors());
app.use(express.json());

// 🛣️ Uso de rutas
app.use('/auth', authRoutes);
app.use('/mascotas', mascotasRoutes);
app.use('/partida', partidaRoutes);
app.use('/enfermedades', require('./routes/enfermedades.routes'));


// 🔍 Ruta de prueba
app.post('/prueba', (req, res) => {
  res.json({ message: 'Ruta POST /prueba activa ✅' });
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
