const db = require('../database');

async function obtenerFichaTecnica(req, res) {
  const usuario_id = req.user.id;
  const mascota_id = req.params.id;

  try {
    const [ficha] = await db.execute(`
      SELECT 
        m.id,
        m.nombre,
        m.edad,
        m.estado_salud,
        m.limpieza,
        m.hambre,
        m.entrenamiento,
        m.juego,
        m.habilidades,
        CONCAT(tm.especie, ' - ', tm.raza) AS tipo,
        e.nombre AS enfermedad_actual,
        he.fecha_inicio,
        he.fecha_fin
      FROM mascotas m
      JOIN tipos_mascotas tm ON m.tipo_id = tm.id
      JOIN partidas p ON m.partida_id = p.id
      LEFT JOIN historial_enfermedades he ON m.id = he.mascota_id
      LEFT JOIN enfermedades e ON he.enfermedad_id = e.id
      WHERE m.id = ? AND p.usuario_id = ?
      ORDER BY he.fecha_inicio DESC
      LIMIT 1
    `, [mascota_id, usuario_id]);

    if (ficha.length === 0) {
      return res.status(404).json({ error: 'Ficha técnica no encontrada para esta mascota.' });
    }

    res.json(ficha[0]);
  } catch (error) {
    console.error('❌ Error al obtener ficha técnica:', error);
    res.status(500).json({ error: 'Error al obtener la ficha técnica' });
  }
}

module.exports = {
  obtenerFichaTecnica
};
