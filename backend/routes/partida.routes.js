const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

// Importa todas las funciones del controlador
const {
  crearPartida,
  obtenerPartidaPorUsuario,
  cambiarUbicacion
} = require('../controllers/partida.controller');

// Ruta protegida para crear una partida
router.post('/create', verifyToken, crearPartida);

// Ruta protegida para cambiar la ubicación del jugador
router.patch('/cambiar-ubicacion', verifyToken, cambiarUbicacion);

// Ruta pública para obtener los datos de la partida de un usuario
router.get('/:usuario_id', obtenerPartidaPorUsuario);

module.exports = router;
