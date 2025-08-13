import React from 'react';
import { Sprite, Container, Text } from '@inlet/react-pixi';

function ZonaInteractiva({ nombre, x, y, icon, onClick }) {
  return (
    <Container x={x} y={y} interactive pointerdown={() => onClick({ x, y, nombre })}>
      <Sprite image={icon} width={100} height={100} />
      <Text
        text={nombre}
        x={50}
        y={-10}
        anchor={0.5}
        style={{ fill: 'white', fontSize: 16 }}
      />
    </Container>
  );
}

export default ZonaInteractiva;
