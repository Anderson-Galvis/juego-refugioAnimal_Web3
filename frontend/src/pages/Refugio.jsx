// src/pages/Refugio.jsx
import React, { useEffect, useState } from 'react'; // Hooks de React
import axios from 'axios'; // Cliente HTTP para llamadas al backend
import MascotaCard from '../components/MascotaCard'; // Componente para mostrar cada mascota individualmente

function Refugio() {
  // Estado para guardar las mascotas del usuario
  const [mascotas, setMascotas] = useState([]);

  // Función para obtener las mascotas del backend
  const obtenerMascotaPorId = async () => {
    try {
      // Obtenemos el token desde localStorage
      const token = localStorage.getItem('token');

      // Hacemos petición al backend para obtener las mascotas del jugador
      const response = await axios.get('http://localhost:4000/mascotas/mias', {
        headers: {
          Authorization: `Bearer ${token}` // Enviamos el token para autenticar al usuario
        }
      });

      // Guardamos la respuesta en el estado
      setMascotas(response.data);
    } catch (err) {
      console.error('❌ Error al cargar mascotas:', err); // Captura errores de red o backend
    }
  };

  // useEffect se ejecuta una vez cuando se carga el componente
  useEffect(() => {
    obtenerMascotaPorId(); // Llamamos la función para cargar mascotas
  }, []);

  return (
    // Contenedor general con fondo claro
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* Encabezado */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">🐾 Refugio de Mascotas</h1>

        {/* Botón para cerrar sesión */}
        <button
          onClick={() => {
            localStorage.removeItem('token'); // Elimina el token
            window.location.href = '/'; // Redirige al inicio de sesión
          }}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Salir
        </button>
      </header>

      {/* Cuerpo de la página */}
      <main className="flex-1 p-4">
        <h2 className="text-xl font-semibold mb-4">Tus Mascotas</h2>

        {/* Grilla para mostrar tarjetas de mascotas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mascotas.map((mascota) => (
  <MascotaCard key={mascota.id} mascota={mascota} onActualizar={obtenerMascotaPorId} />
))}

        </div>
      </main>

      {/* Botones flotantes en la esquina inferior derecha */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-3">
        <button className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition">
          🏙️ Ciudad
        </button>
        <button className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition">
          ⚡ Energía
        </button>
        <button className="bg-yellow-400 text-white rounded-full p-4 shadow-lg hover:bg-yellow-500 transition">
          🎮 Acciones
        </button>
      </div>
    </div>
  );
}

export default Refugio;
