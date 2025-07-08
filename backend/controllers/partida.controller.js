const db = require('../database');

exports.crearPartida = async (req, res) => {
    const usuario_id = req.user.id; // ⚠️ viene del token
    const { nombre_refugio } = req.body;

    try {
        // Verificar si el usuario ya tiene una partida
        const [partidaExistente] = await db.execute(
            'SELECT * FROM partidas WHERE usuario_id = ?', [usuario_id]
        );

        if (partidaExistente.length > 0) {
            return res.status(400).json({ error: 'El usuario ya tiene una partida.' });
        }

        // Obtener ID del mapa "Refugio"
        const [refugio] = await db.execute(
            "SELECT id FROM mapas WHERE nombre = 'Refugio'"
        );

        if (refugio.length === 0) {
            return res.status(404).json({ error: 'Mapa \"Refugio\" no encontrado' });
        }

        const ubicacion_actual = refugio[0].id;

        // Crear partida
        await db.execute(`
          INSERT INTO partidas (
            usuario_id, nombre_refugio, ubicacion_actual, score,
            nivel_jugador, experiencia, vida, energia, en_juego, fecha_inicio
          ) VALUES (?, ?, ?, 0, 1, 0, 100, 100, TRUE, NOW())
        `, [usuario_id, nombre_refugio, ubicacion_actual]);

        res.status(201).json({ message: 'Partida creada exitosamente' });
    } catch (error) {
        console.error('❌ Error al crear partida:', error);
        res.status(500).json({ error: 'Error al crear partida' });
    }
};



exports.obtenerPartidaPorUsuario = async (req, res) => {
    const { usuario_id } = req.params;
  
    try {
      const [result] = await db.execute(`
        SELECT 
          u.nombre AS jugador,
          p.nombre_refugio,
          p.score,
          p.nivel_jugador AS nivel,
          p.experiencia,
          p.vida,
          p.energia,
          m.nombre AS ubicacion_actual,
          p.fecha_inicio
        FROM partidas p
        JOIN usuarios u ON p.usuario_id = u.id
        JOIN mapas m ON p.ubicacion_actual = m.id
        WHERE p.usuario_id = ?
      `, [usuario_id]);
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'Partida no encontrada para este usuario.' });
      }
  
      res.status(200).json(result[0]);
    } catch (error) {
      console.error('❌ Error al obtener partida:', error);
      res.status(500).json({ error: 'Error al obtener datos de la partida' });
    }
  };


  exports.cambiarUbicacion = async (req, res) => {
    const usuario_id = req.user.id;
    const { nueva_ubicacion } = req.body;
  
    try {
      // Verifica si la ubicación existe
      const [mapa] = await db.execute('SELECT id FROM mapas WHERE nombre = ?', [nueva_ubicacion]);
  
      if (mapa.length === 0) {
        return res.status(404).json({ error: 'Ubicación no válida' });
      }
  
      const nuevaUbicacionId = mapa[0].id;
  
      // Actualiza la partida
      await db.execute(
        'UPDATE partidas SET ubicacion_actual = ? WHERE usuario_id = ?',
        [nuevaUbicacionId, usuario_id]
      );
  
      res.json({ message: `Ubicación cambiada a ${nueva_ubicacion}` });
    } catch (error) {
      console.error('❌ Error al cambiar ubicación:', error);
      res.status(500).json({ error: 'Error al cambiar ubicación' });
    }
  };
  