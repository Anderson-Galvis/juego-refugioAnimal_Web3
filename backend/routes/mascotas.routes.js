const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { obtenerFichaTecnica } = require('../controllers/fichaTecnica.controller');

const {
  rescatarMascota,
  obtenerMisMascotas,
  obtenerMascotaPorId,
  alimentarMascota, // ✅ Importamos la función que faltaba
  jugarConMascota,
  entrenarMascota,
  limpiarMascota,
  atenderMascota 

} = require('../controllers/mascotas.controller');

// Ruta para rescatar una mascota (requiere token)
router.post('/rescatar', verifyToken, rescatarMascota);

// Ruta para obtener todas las mascotas del jugador (requiere token)
router.get('/mias', verifyToken, obtenerMisMascotas);

// Ruta para obtener una mascota específica por ID (requiere token)
router.get('/:id', verifyToken, obtenerMascotaPorId);

// ✅ Ruta para alimentar una mascota específica (requiere token)
router.post('/:id/alimentar', verifyToken, alimentarMascota);

// jugar con la mascota 
router.post('/:id/jugar', verifyToken, jugarConMascota);

// Ruta para entrenar a la mascota
router.post('/:id/entrenar', verifyToken, entrenarMascota);

// ruta para limpiar las mascotas 
router.post('/:id/limpiar', verifyToken, limpiarMascota);


// ruta para atender y curar a la mascota 
router.post('/:id/atender', verifyToken, atenderMascota);

// Ficha tecnica de la mascota 
router.get('/mascotas/:id/ficha', verifyToken, obtenerFichaTecnica);


module.exports = router;
