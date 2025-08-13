// src/pages/Ciudad.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const mapas = [
  { id: 1, nombre: "Bosque Encantado" },
  { id: 2, nombre: "Desierto Ardiente" },
  { id: 3, nombre: "Montañas Frías" },
  { id: 4, nombre: "Isla Misteriosa" },
];

function Ciudad() {
  const navigate = useNavigate();

  const seleccionarMapa = (id) => {
    navigate(`/mapa/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="text-3xl font-bold mb-6">Elige un mapa para rescatar mascotas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md w-full">
        {mapas.map((mapa) => (
          <button
            key={mapa.id}
            onClick={() => seleccionarMapa(mapa.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center shadow"
          >
            {mapa.nombre}
          </button>
          

          
        ))}
      </div>

      
      {/* Botón para volver al refugio */}
      <button
        onClick={() => navigate("/refugio")}
        className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
      >
        ← Volver al Refugio
      </button>
    </div>
            

  );
}

export default Ciudad;
