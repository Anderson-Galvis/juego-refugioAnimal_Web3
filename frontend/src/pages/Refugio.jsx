import React, { useEffect, useState } from "react";
import axios from "axios";
import MascotaCard from "../components/MascotaCard";
import { useNavigate } from "react-router-dom";

function Refugio() {
  const [mascotas, setMascotas] = useState([]);

  const navigate = useNavigate();
  const obtenerMascotaPorId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:4000/mascotas/mias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMascotas(response.data);
    } catch (err) {
      console.error("❌ Error al cargar mascotas:", err);
    }
  };

  useEffect(() => {
    obtenerMascotaPorId();
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-[1200px] h-[700px] bg-[#fefefe] border-[10px] border-yellow-500 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">

        {/* Encabezado */}
        <header className="bg-yellow-300 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">🐾 Refugio Animal</h1>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Salir
          </button>
        </header>

        {/* Contenido */}
        <div className="flex flex-1">
          
          {/* Área de mascotas */}
          <main className="w-3/4 bg-green-100 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3">Tus Mascotas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mascotas.length > 0 ? (
                mascotas.map((mascota) => (
                  <MascotaCard
                    key={mascota.id}
                    mascota={mascota}
                    onActualizar={obtenerMascotaPorId}
                  />
                ))
              ) : (
                <p className="text-gray-500">No tienes mascotas registradas.</p>
              )}
            </div>
          </main>

          {/* Botones laterales */}
          <aside className="w-1/4 bg-blue-100 p-4 border-l-4 border-blue-300 flex flex-col justify-around items-center">
          <button
      onClick={() => navigate("/ciudad")}
      className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
    >
      🏙️ Ciudad
    </button>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full shadow-lg">
              ⚡ Energía
            </button>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-full shadow-lg">
              🎮 Acciones
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Refugio;
