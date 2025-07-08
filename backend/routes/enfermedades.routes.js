const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { enfermarMascotas } = require('../controllers/enfermedades.controller');

// Solo el admin o pruebas pueden usarlo
router.post('/enfermar', verifyToken, async (req, res) => {
  await enfermarMascotas();
  res.json({ message: 'Proceso de enfermedad ejecutado.' });
});

module.exports = router;
