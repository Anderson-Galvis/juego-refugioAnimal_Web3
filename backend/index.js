require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./database');

// 📡 Rutas
const authRoutes = require('./routes/auth.routes');
const mascotasRoutes = require('./routes/mascotas.routes');
const partidaRoutes = require('./routes/partida.routes');
const enfermedadesRoutes = require('./routes/enfermedades.routes');

// ✅ Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ Middleware para parsear JSON
app.use(express.json());

// 🛣️ Rutas
app.use('/auth', authRoutes);
app.use('/mascotas', mascotasRoutes);
app.use('/partida', partidaRoutes);
app.use('/enfermedades', enfermedadesRoutes);

// 🔍 Ruta de prueba
app.post('/prueba', (req, res) => {
  res.json({ message: 'Ruta POST /prueba activa ✅' });
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
