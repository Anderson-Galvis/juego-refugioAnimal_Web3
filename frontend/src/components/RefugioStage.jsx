import React, { useState } from 'react';
import { Stage, Sprite } from '@inlet/react-pixi';
import SpriteMascota from './SpriteMascota';
import ZonaInteractiva from './ZonaInteractiva';

const zonas = [
  { nombre: 'Comida', x: 150, y: 100, icon: '/sprites/icons/comida.png' },
  { nombre: 'Juegos', x: 300, y: 100, icon: '/sprites/icons/juego.png' },
  { nombre: 'Aseo', x: 450, y: 100, icon: '/sprites/icons/aseo.png' },
  { nombre: 'Curación', x: 600, y: 100, icon: '/sprites/icons/curar.png' },
];

function RefugioStage({ mascotas, onActualizar }) {
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [destinos, setDestinos] = useState({});

  const moverMascota = (zona) => {
    if (mascotaSeleccionada) {
      setDestinos((prev) => ({
        ...prev,
        [mascotaSeleccionada]: { x: zona.x, y: zona.y },
      }));
    }
  };

  const alLlegar = async (mascotaId) => {
    const zona = Object.entries(destinos).find(([id]) => +id === mascotaId);
    if (!zona) return;

    const accion = zona[1];
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:4000/mascotas/${mascotaId}/${accion.nombre.toLowerCase()}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      onActualizar();
    } catch (e) {
      console.error('Error en acción', e);
    }
  };

  return (
    <Stage width={1024} height={768} options={{ backgroundColor: 0xa0d9f6 }}>
      <Sprite image="/sprites/fondo-finca.png" x={0} y={0} width={1024} height={768} />

      {zonas.map((zona, i) => (
        <ZonaInteractiva key={i} {...zona} onClick={moverMascota} />
      ))}

      {mascotas.map((mascota) => (
        <SpriteMascota
          key={mascota.id}
          mascota={mascota}
          destino={destinos[mascota.id]}
          isSelected={mascotaSeleccionada === mascota.id}
          onClick={(id) => setMascotaSeleccionada(id)}
          onLlegada={alLlegar}
        />
      ))}
    </Stage>
  );
}

export default RefugioStage;
