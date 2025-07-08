const db = require('../database');

async function enfermarMascotas() {
  try {
    // 1. Obtener todas las mascotas saludables
    const [mascotas] = await db.execute(`
      SELECT id FROM mascotas WHERE estado_salud = 'saludable'
    `);

    for (const mascota of mascotas) {
      // 30% de probabilidad de enfermar
      if (Math.random() < 0.3) {
        const [enfermedades] = await db.execute(`SELECT * FROM enfermedades`);
        const enfermedad = enfermedades[Math.floor(Math.random() * enfermedades.length)];

        // 2. Actualizar mascota como enferma
        await db.execute(`
          UPDATE mascotas
          SET estado_salud = 'enfermo', enfermedad_id = ?, progreso_curacion = 0
          WHERE id = ?
        `, [enfermedad.id, mascota.id]);

        // 3. Registrar en historial
        await db.execute(`
          INSERT INTO historial_enfermedades (mascota_id, enfermedad_id)
          VALUES (?, ?)
        `, [mascota.id, enfermedad.id]);

        console.log(`🐾 Mascota ${mascota.id} enfermó de ${enfermedad.nombre}`);
      }
    }
  } catch (error) {
    console.error('❌ Error al enfermar mascotas:', error);
  }
}

module.exports = {
  enfermarMascotas
};
