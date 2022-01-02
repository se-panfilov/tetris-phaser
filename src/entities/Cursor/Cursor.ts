import { Actor, ActorArgs, CollisionType, Engine } from 'excalibur';
import { InputEvents } from '@/constants';
import { PointerEvent } from 'excalibur/build/dist/Input/PointerEvents';
import { config } from './config';

export const NAME = 'Cursor';

export class Cursor extends Actor {
  constructor(params: ActorArgs) {
    super({ ...params, name: NAME });
  }

  public override onInitialize(engine: Engine): void {
    engine.input.pointers.primary.on(InputEvents.Move, ({ worldPos }: PointerEvent) => {
      this.pos.x = worldPos.x;
      this.pos.y = worldPos.y;
    });
  }
}

export const cursor = new Cursor(config);

cursor.body.collisionType = CollisionType.Active;
