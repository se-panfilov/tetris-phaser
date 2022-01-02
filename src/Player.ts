import { Actor, CollisionType, Color, Engine, ImageSource, Input } from 'excalibur';
import playerSprite from '@/assets/player.png';

const image = new ImageSource(playerSprite);

class Player extends Actor {
  public override onInitialize(engine: Engine) {
    // TODO (S.Panfilov) Sprite doesn't work for a some reason
    // this.graphics.use(image.toSprite());
  }

  public override update(engine: Engine, delta: number): void {
    if (engine.input.keyboard.isHeld(Input.Keys.W)) this.pos.y = this.pos.y - 2;
    if (engine.input.keyboard.isHeld(Input.Keys.A)) this.pos.x = this.pos.x - 2;
    if (engine.input.keyboard.isHeld(Input.Keys.S)) this.pos.y = this.pos.y + 2;
    if (engine.input.keyboard.isHeld(Input.Keys.D)) this.pos.x = this.pos.x + 2;
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
