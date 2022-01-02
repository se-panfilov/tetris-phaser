import { Actor, CollisionType, Color, Engine, vec } from 'excalibur';

export function getGround(game: Engine): Actor {
  return new Actor({
    name: 'Ground',
    pos: vec(game.halfDrawWidth, game.drawHeight),
    width: game.drawWidth,
    height: 100,
    color: Color.DarkGray,
    collisionType: CollisionType.Fixed
  });
}
