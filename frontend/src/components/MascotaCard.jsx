// src/components/MascotaCard.jsx
import React, { useState } from 'react';
import axios from 'axios';

function MascotaCard({ mascota, onActualizar }) {
  const token = localStorage.getItem('token');
  const [tipoEntrenamiento, setTipoEntrenamiento] = useState("");
  const [tipoJuego, setTipoJuego] = useState("");


  // Función para ejecutar una acción sobre la mascota
  const realizarAccion = async (accion, tipoExtraId = null) => {
    try {
      const body = (accion === 'entrenar')
        ? { tipo_entrenamiento_id: tipoExtraId }
        : (accion === 'jugar')
        ? { tipo_juego_id: tipoExtraId }
        : {};
  
      await axios.post(
        `http://localhost:4000/mascotas/${mascota.id}/${accion}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      onActualizar();
    } catch (err) {
      console.error(`❌ Error al intentar ${accion}:`, err);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold">{mascota.nombre}</h2>
      <p>Estado de salud: {mascota.estado_salud}</p>
      <p>Edad: {mascota.edad}</p>
      <p>Hambre: {mascota.hambre}</p>
      <p>Limpieza: {mascota.limpieza}</p>
      <p>Entrenamiento: {mascota.entrenamiento}</p>
      <p>Juego: {mascota.juego}</p>

      {/* 🔘 Botones de acción */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => realizarAccion('alimentar')}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          🍗 Alimentar
        </button>

        <select
  value={tipoJuego}
  onChange={(e) => setTipoJuego(e.target.value)}
  className="border rounded px-2 py-1"
>
  <option value="">Selecciona juego</option>
  <option value="1">Pelota 🎾</option>
  <option value="2">Atrapar 🐕</option>
  <option value="3">Carrera 🐾</option>
</select>

<button
  onClick={() => {
    if (tipoJuego) {
      realizarAccion('jugar', parseInt(tipoJuego));
    } else {
      alert('Selecciona un tipo de juego primero.');
    }
  }}
  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
>
  🎾 Jugar
</button>


        <button
          onClick={() => realizarAccion('limpiar')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
        >
          🧼 Limpiar
        </button>

        {/* 🏋️ Entrenar: selector + botón */}
        <select
          value={tipoEntrenamiento}
          onChange={(e) => setTipoEntrenamiento(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Selecciona entrenamiento</option>
          <option value="1">Básico 🐾</option>
          <option value="2">Avanzado 🐕</option>
          <option value="3">Experto 🦴</option>
        </select>

        <button
          onClick={() => {
            if (tipoEntrenamiento) {
              realizarAccion('entrenar', parseInt(tipoEntrenamiento));
            } else {
              alert('Selecciona un tipo de entrenamiento primero.');
            }
          }}
          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
        >
          🏋️ Entrenar
        </button>

        <button
          onClick={() => realizarAccion('atender')}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          🏥 Curar
        </button>
      </div>
    </div>
  );
}

export default MascotaCard;
