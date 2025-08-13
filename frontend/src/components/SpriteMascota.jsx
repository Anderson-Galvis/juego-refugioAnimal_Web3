import React, { useEffect, useRef, useState } from 'react';
import { Sprite, Container, Text } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

function SpriteMascota({ mascota, destino, isSelected, onClick, onLlegada }) {
  const spriteRef = useRef();
  const [pos, setPos] = useState({ x: mascota.x || 100, y: mascota.y || 300 });

  // Movimiento animado
  useEffect(() => {
    if (!destino) return;

    const mover = () => {
      const dx = destino.x - pos.x;
      const dy = destino.y - pos.y;
      const distancia = Math.sqrt(dx * dx + dy * dy);

      if (distancia < 5) {
        onLlegada(mascota.id);
        return;
      }

      const velocidad = 2;
      const nuevaX = pos.x + (dx / distancia) * velocidad;
      const nuevaY = pos.y + (dy / distancia) * velocidad;

      setPos({ x: nuevaX, y: nuevaY });
      requestAnimationFrame(mover);
    };

    mover();
  }, [destino]);

  return (
    <Container
      x={pos.x}
      y={pos.y}
      interactive
      pointerdown={() => onClick(mascota.id)}
    >
      <Sprite
        ref={spriteRef}
        image={`/sprites/${mascota.tipo}.png`}
        width={80}
        height={80}
      />
      <Text
        text={mascota.nombre + (isSelected ? ' ✅' : '')}
        anchor={0.5}
        x={40}
        y={-10}
        style={{ fill: isSelected ? 'yellow' : 'white', fontSize: 14 }}
      />
    </Container>
  );
}

export default SpriteMascota;
