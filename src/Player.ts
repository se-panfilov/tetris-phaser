import { Actor, CollisionType, Color, Engine, ImageSource } from 'excalibur';
import playerSprite from '@/assets/player.png';

const image = new ImageSource(playerSprite);

class Player extends Actor {
  public override onInitialize(engine: Engine) {
    // TODO (S.Panfilov) Sprite doesn't work for a some reason
    // this.graphics.use(image.toSprite());
  }
}

export const player: Player = new Player({
  x: 200,
  y: 50,
  width: 50,
  height: 50,
  color: Color.Chartreuse
});
// player.graphics.use(image.toSprite());

player.body.collisionType = CollisionType.Active;
