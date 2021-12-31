import { Actor, CollisionType, Color } from 'excalibur';

export const cursor = new Actor({
  x: 20,
  y: 20,
  width: 50,
  height: 50,
  color: Color.Red
});

cursor.body.collisionType = CollisionType.Active;
