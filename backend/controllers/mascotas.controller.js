const db = require('../database');

//  Rescatar mascota
const rescatarMascota = async (req, res) => {
  const usuario_id = req.user.id;

  try {
    const [partidas] = await db.execute(`
      SELECT p.id, p.nivel_jugador, m.nombre AS ubicacion
      FROM partidas p
      JOIN mapas m ON p.ubicacion_actual = m.id
      WHERE p.usuario_id = ?
    `, [usuario_id]);

    if (partidas.length === 0) {
      return res.status(404).json({ error: 'No se encontró partida para este usuario.' });
    }

    const partida = partidas[0];

    if (partida.ubicacion !== 'Ciudad') {
      return res.status(403).json({ error: 'Solo puedes rescatar mascotas desde la ciudad.' });
    }

    const [tipos] = await db.execute(`
      SELECT * FROM tipos_mascotas
      WHERE nivel_dificultad = ?
    `, [partida.nivel_jugador]);

    if (tipos.length === 0) {
      return res.status(404).json({ error: 'No hay tipos de mascotas disponibles para tu nivel.' });
    }

    const tipoSeleccionado = tipos[Math.floor(Math.random() * tipos.length)];
    const nombreMascota = 'Firulais';
    const edad = Math.floor(Math.random() * 5) + 1;
    const estadoSalud = 'en tratamiento';

    await db.execute(`
      INSERT INTO mascotas (
        nombre, edad, estado_salud, limpieza, hambre,
        entrenamiento, juego, habilidades, tipo_id, partida_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      nombreMascota,
      edad,
      estadoSalud,
      tipoSeleccionado.limpieza_inicial,
      tipoSeleccionado.hambre_inicial,
      tipoSeleccionado.entrenamiento_inicial,
      tipoSeleccionado.juego_inicial,
      'Ninguna',
      tipoSeleccionado.id,
      partida.id
    ]);

    res.status(201).json({
      message: 'Mascota rescatada exitosamente',
      tipo: `${tipoSeleccionado.especie} - ${tipoSeleccionado.raza}`
    });
  } catch (error) {
    console.error('❌ Error detallado al rescatar mascota:', error);
    res.status(500).json({ error: 'Error al rescatar mascota' });
  }
};

//  Función 2: Obtener mis mascotas
const obtenerMisMascotas = async (req, res) => {
  const usuario_id = req.user.id;

  try {
    const [partida] = await db.execute(
      'SELECT id FROM partidas WHERE usuario_id = ?', [usuario_id]
    );

    if (partida.length === 0) {
      return res.status(404).json({ error: 'No se encontró una partida activa.' });
    }

    const partida_id = partida[0].id;

    const [mascotas] = await db.execute(`
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
        CONCAT(tm.especie, ' - ', tm.raza) AS tipo
      FROM mascotas m
      JOIN tipos_mascotas tm ON m.tipo_id = tm.id
      WHERE m.partida_id = ?
    `, [partida_id]);

    res.json(mascotas);
  } catch (error) {
    console.error('❌ Error al obtener mascotas del usuario:', error);
    res.status(500).json({ error: 'Error al obtener mascotas del usuario' });
  }
};

// 🎯 Función 3: Obtener una mascota por ID
const obtenerMascotaPorId = async (req, res) => {
  const usuario_id = req.user.id;
  const { id } = req.params;

  try {
    const [mascotas] = await db.execute(`
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
        CONCAT(tm.especie, ' - ', tm.raza) AS tipo
      FROM mascotas m
      JOIN tipos_mascotas tm ON m.tipo_id = tm.id
      JOIN partidas p ON m.partida_id = p.id
      WHERE m.id = ? AND p.usuario_id = ?
    `, [id, usuario_id]);

    if (mascotas.length === 0) {
      return res.status(404).json({ error: 'Mascota no encontrada o no pertenece a este usuario.' });
    }

    res.json(mascotas[0]);
  } catch (error) {
    console.error('❌ Error al obtener mascota:', error);
    res.status(500).json({ error: 'Error al obtener datos de la mascota' });
  }
};

//  Alimentar mascota
const alimentarMascota = async (req, res) => {
  const usuario_id = req.user.id;
  const mascota_id = req.params.id;

  try {
    const [mascotas] = await db.execute(`
      SELECT 
        m.id, m.hambre, 
        p.id AS partida_id, p.energia, p.experiencia, 
        mp.nombre AS ubicacion
      FROM mascotas m
      JOIN partidas p ON m.partida_id = p.id
      JOIN mapas mp ON p.ubicacion_actual = mp.id
      WHERE m.id = ? AND p.usuario_id = ?
    `, [mascota_id, usuario_id]);

    if (mascotas.length === 0) {
      return res.status(404).json({ error: 'Mascota no encontrada o no pertenece a este jugador.' });
    }

    const mascota = mascotas[0];
    console.log('🐾 Mascota antes de acción:', mascota); //

    if (mascota.ubicacion !== 'Refugio') {
      return res.status(403).json({ error: 'Solo puedes alimentar a tu mascota cuando estás en el Refugio.' });
    }
    // ✅ 3. Nueva validación: ¿ya está llena?
    if (mascota.hambre >= 100) {
      return res.status(400).json({ error: 'Tu mascota ya está completamente alimentada.' });
    }

    if (mascota.energia < 10) {
      return res.status(400).json({ error: 'Energía insuficiente para alimentar.' });
    }

    const nuevaHambre = Math.min(mascota.hambre + 20, 100);
    const nuevaEnergia = Math.max(mascota.energia - 10, 0); 
    const nuevaExperiencia = mascota.experiencia + 5;

    await db.execute(`UPDATE mascotas SET hambre = ? WHERE id = ?`, [nuevaHambre, mascota_id]);
    await db.execute(`UPDATE partidas SET energia = ?, experiencia = ? WHERE id = ?`, [nuevaEnergia, nuevaExperiencia, mascota.partida_id]);

    res.status(200).json({
      message: 'Mascota alimentada 🍽️',
      nueva_hambre: nuevaHambre,
      energia_restante: nuevaEnergia,
      experiencia: nuevaExperiencia
    });
  } catch (error) {
 console.error(`❌ Error al alimentar la mascota:`, error);
    res.status(500).json({ error: 'Error al alimentar la mascota' });
  }
};


//JUGAR CON LA MASCOTA 
const jugarConMascota = async (req, res) => {
  const usuario_id = req.user.id;
  const mascota_id = req.params.id;
  const { tipo_juego_id } = req.body;

  // 🛡️ Validar que se haya enviado tipo_juego_id
  if (typeof tipo_juego_id === 'undefined' || tipo_juego_id === null) {
    return res.status(400).json({ error: 'El tipo de juego es obligatorio.' });
  }

  try {
    // 1. Obtener mascota, partida y ubicación
    const [mascotas] = await db.execute(`
      SELECT 
        m.id, m.juego,
        p.id AS partida_id, p.energia, p.experiencia,
        mp.nombre AS ubicacion
      FROM mascotas m
      JOIN partidas p ON m.partida_id = p.id
      JOIN mapas mp ON p.ubicacion_actual = mp.id
      WHERE m.id = ? AND p.usuario_id = ?
    `, [mascota_id, usuario_id]);

    if (mascotas.length === 0) {
      return res.status(404).json({ error: 'Mascota no encontrada o no pertenece al jugador.' });
    }

    const mascota = mascotas[0];
    console.log('🐾 Mascota al alimentar:', mascota);

    // 2. Verificar si está en el Refugio
    if (mascota.ubicacion !== 'Refugio') {
      return res.status(403).json({ error: 'Solo puedes jugar con tu mascota en el Refugio.' });
    }

    // 3. Obtener datos del tipo de juego
    const [juegos] = await db.execute(`
      SELECT * FROM tipos_juegos WHERE id = ?
    `, [tipo_juego_id]);

    if (juegos.length === 0) {
      return res.status(404).json({ error: 'Tipo de juego no válido.' });
    }

    const juego = juegos[0];

    // 4. Calcular nuevos valores
    const nuevoNivelJuego = Math.min(mascota.juego + juego.efecto_experiencia, 100);
    const nuevaEnergia = Math.min(mascota.energia + juego.efecto_energia, 100);
    const nuevaExperiencia = mascota.experiencia + juego.efecto_experiencia;

    // 5. Actualizar mascota y partida
    await db.execute(`UPDATE mascotas SET juego = ? WHERE id = ?`, [nuevoNivelJuego, mascota_id]);
    await db.execute(
      `UPDATE partidas SET energia = ?, experiencia = ? WHERE id = ?`,
      [nuevaEnergia, nuevaExperiencia, mascota.partida_id]
    );

    // 6. Registrar en el historial
    await db.execute(`
      INSERT INTO historial_juegos (mascota_id, tipo_juego_id, energia_resultante, experiencia_ganada)
      VALUES (?, ?, ?, ?)
    `, [mascota_id, tipo_juego_id, nuevaEnergia, juego.efecto_experiencia]);

    // 7. Responder
    res.status(200).json({
      message: `Jugaste a "${juego.nombre}" con tu mascota 🐾`,
      nuevo_nivel_juego: nuevoNivelJuego,
      energia_actual: nuevaEnergia,
      experiencia_total: nuevaExperiencia
    });

  } catch (error) {
    console.error('❌ Error al jugar con la mascota:', error);
    res.status(500).json({ error: 'Error al jugar con la mascota' });
  }
};



// ENTRENAR LA MASCOTA 
async function entrenarMascota(req, res) {
  const usuario_id = req.user.id;
  const mascota_id = req.params.id;
  const { tipo_entrenamiento_id } = req.body;

  // ✅ Validar que se haya enviado tipo_entrenamiento_id
  if (!tipo_entrenamiento_id) {
    return res.status(400).json({ error: 'Se requiere tipo_entrenamiento_id en el cuerpo de la solicitud.' });
  }

  try {
    console.log('💬 Body recibido:', req.body);

    // 1. Obtener datos de la mascota, su partida y ubicación
    const [mascotas] = await db.execute(`
      SELECT 
        m.id, m.entrenamiento,
        p.id AS partida_id, p.energia, p.experiencia,
        mp.nombre AS ubicacion
      FROM mascotas m
      JOIN partidas p ON m.partida_id = p.id
      JOIN mapas mp ON p.ubicacion_actual = mp.id
      WHERE m.id = ? AND p.usuario_id = ?
    `, [mascota_id, usuario_id]);

    if (mascotas.length === 0) {
      return res.status(404).json({ error: 'Mascota no encontrada o no pertenece a este jugador.' });
    }

    const mascota = mascotas[0];
    console.log("mascota lista para entrenar")

    // 2. Verificar que esté en el Refugio
    if (mascota.ubicacion !== 'Refugio') {
      return res.status(403).json({ error: 'Solo puedes entrenar a tu mascota cuando estás en el Refugio.' });
    }

    // 3. Verificar energía suficiente
    if (mascota.energia < 5) {
      return res.status(400).json({ error: 'Energía insuficiente para entrenar.' });
    }

    // 4. Obtener el tipo de entrenamiento
    const [tipos] = await db.execute(
      'SELECT * FROM tipos_entrenamiento WHERE id = ?', [tipo_entrenamiento_id]
    );

    if (tipos.length === 0) {
      return res.status(404).json({ error: 'Tipo de entrenamiento no válido.' });
    }

    const tipo = tipos[0];

    // 5. Calcular nuevos valores
    const nuevoEntrenamiento = Math.min(mascota.entrenamiento + tipo.efecto_entrenamiento, 100);
    const nuevaEnergia = mascota.energia - 5;
    const nuevaExperiencia = mascota.experiencia + tipo.efecto_experiencia;

    // 6. Actualizar mascota y partida
    await db.execute(`UPDATE mascotas SET entrenamiento = ? WHERE id = ?`, [nuevoEntrenamiento, mascota_id]);
    await db.execute(`UPDATE partidas SET energia = ?, experiencia = ? WHERE id = ?`,
      [nuevaEnergia, nuevaExperiencia, mascota.partida_id]);

    // 7. Registrar en el historial
    await db.execute(`
      INSERT INTO historial_entrenamiento (mascota_id, tipo_entrenamiento_id)
      VALUES (?, ?)`, [mascota_id, tipo_entrenamiento_id]);

    // 8. Respuesta exitosa
    res.status(200).json({
      message: 'Mascota entrenada con éxito 🐶🏋️',
      nuevo_entrenamiento: nuevoEntrenamiento,
      energia_restante: nuevaEnergia,
      experiencia: nuevaExperiencia,
      tipo_entrenamiento: tipo.nombre
    });

  } catch (error) {
    console.error('❌ Error al entrenar mascota:', error);
    res.status(500).json({ error: 'Error al entrenar la mascota' });
  }
}


// LIMPIAR LA MASCOTA 
const limpiarMascota = async (req, res) => {
  const usuario_id = req.user.id;
  const mascota_id = req.params.id;

  try {
    const [mascotas] = await db.execute(`
      SELECT 
        m.id, m.limpieza,
        p.id AS partida_id, p.energia, p.experiencia,
        mp.nombre AS ubicacion
      FROM mascotas m
      JOIN partidas p ON m.partida_id = p.id
      JOIN mapas mp ON p.ubicacion_actual = mp.id
      WHERE m.id = ? AND p.usuario_id = ?
    `, [mascota_id, usuario_id]);

    if (mascotas.length === 0) {
      return res.status(404).json({ error: 'Mascota no encontrada o no pertenece a este jugador.' });
    }

    const mascota = mascotas[0];

    if (mascota.ubicacion !== 'Refugio') {
      return res.status(403).json({ error: 'Solo puedes limpiar a tu mascota en el Refugio.' });
    }

    if (mascota.energia < 10) {
      return res.status(400).json({ error: 'Energía insuficiente para limpiar.' });
    }

    if (mascota.limpieza >= 100) {
      return res.status(400).json({ error: 'Tu mascota ya está completamente limpia.' });
    }

    const nuevaLimpieza = Math.min(mascota.limpieza + 30, 100);
    const nuevaEnergia = mascota.energia - 10;
    const nuevaExperiencia = mascota.experiencia + 5;

    await db.execute(`UPDATE mascotas SET limpieza = ? WHERE id = ?`, [nuevaLimpieza, mascota_id]);
    await db.execute(`UPDATE partidas SET energia = ?, experiencia = ? WHERE id = ?`, [nuevaEnergia, nuevaExperiencia, mascota.partida_id]);

    res.status(200).json({
      message: 'Mascota limpiada 🧼',
      limpieza_actual: nuevaLimpieza,
      energia_restante: nuevaEnergia,
      experiencia: nuevaExperiencia
    });

  } catch (error) {
    console.error('❌ Error al limpiar mascota:', error);
    res.status(500).json({ error: 'Error al limpiar la mascota' });
  }
};


async function atenderMascota(req, res) {
  const usuario_id = req.user.id;
  const mascota_id = req.params.id;

  try {
    // Obtener info completa incluyendo enfermedad
    const [rows] = await db.execute(`
      SELECT 
        m.id, m.estado_salud, m.enfermedad_id, m.progreso_curacion,
        p.id AS partida_id, p.energia, p.experiencia,
        mp.nombre AS ubicacion,
        e.veces_para_curar
      FROM mascotas m
      JOIN partidas p ON m.partida_id = p.id
      JOIN mapas mp ON p.ubicacion_actual = mp.id
      JOIN enfermedades e ON m.enfermedad_id = e.id
      WHERE m.id = ? AND p.usuario_id = ?
    `, [mascota_id, usuario_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Mascota no encontrada o no está enferma.' });
    }

    const mascota = rows[0];

    if (!['enfermo', 'en tratamiento'].includes(mascota.estado_salud)) {
      return res.status(400).json({ error: 'La mascota no necesita atención médica.' });
    }

    if (mascota.ubicacion !== 'Refugio') {
      return res.status(403).json({ error: 'Solo puedes atender a tu mascota en el Refugio.' });
    }

    if (mascota.energia < 15) {
      return res.status(400).json({ error: 'Energía insuficiente para atención médica.' });
    }

    const nuevaEnergia = mascota.energia - 15;
    const nuevaExperiencia = mascota.experiencia + 8;
    const nuevoProgreso = mascota.progreso_curacion + 1;

    await db.execute(`UPDATE partidas SET energia = ?, experiencia = ? WHERE id = ?`, [nuevaEnergia, nuevaExperiencia, mascota.partida_id]);

    if (nuevoProgreso >= mascota.veces_para_curar) {
      // Se cura completamente
      await db.execute(`
        UPDATE mascotas
        SET estado_salud = 'saludable', enfermedad_id = NULL, progreso_curacion = NULL
        WHERE id = ?
      `, [mascota.id]);

      await db.execute(`
        UPDATE historial_enfermedades
        SET fecha_fin = NOW()
        WHERE mascota_id = ? AND enfermedad_id = ? AND fecha_fin IS NULL
      `, [mascota.id, mascota.enfermedad_id]);

      return res.status(200).json({
        message: '🎉 La mascota ha sido completamente curada',
        estado_salud: 'saludable',
        energia_restante: nuevaEnergia,
        experiencia: nuevaExperiencia
      });
    } else {
      // Aún en tratamiento
      await db.execute(`
        UPDATE mascotas
        SET estado_salud = 'en tratamiento', progreso_curacion = ?
        WHERE id = ?
      `, [nuevoProgreso, mascota.id]);

      return res.status(200).json({
        message: '✅ Mascota atendida. Tratamiento en curso...',
        progreso: nuevoProgreso,
        restante: mascota.veces_para_curar - nuevoProgreso,
        energia_restante: nuevaEnergia,
        experiencia: nuevaExperiencia
      });
    }

  } catch (error) {
    console.error('❌ Error al atender mascota:', error);
    res.status(500).json({ error: 'Error al atender a la mascota' });
  }
}





// ✅ Exportar todas las funciones
module.exports = {
  rescatarMascota,
  obtenerMisMascotas,
  obtenerMascotaPorId,
  alimentarMascota,
  jugarConMascota,
  entrenarMascota,
  limpiarMascota,
  atenderMascota
};
