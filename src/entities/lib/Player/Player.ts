import { Actor, ActorConfig, ActorPosition } from '@/models';
import { playerConfig } from '@/entities/lib/Player/Config';
import { destroyActor, LoadActorSprite } from '@/services/lib/ActorService';
import { Sprite } from 'pixi.js';
import { BehaviorSubject } from 'rxjs';

export async function Player({ width, height, spriteURL }: ActorConfig = playerConfig): Promise<Actor> {
  const id: string = 'Player';
  const sprite: Sprite = await LoadActorSprite(id, spriteURL, { height, width });
  const position$ = new BehaviorSubject<ActorPosition>({ x: 0, y: 0 });

  position$.subscribe((value) => _setSpritePosition(value));

  function getPosition(): BehaviorSubject<ActorPosition> {
    return position$;
  }

  const setPosition = (position: ActorPosition): void => position$.next(position);

  function _setSpritePosition({ x, y }: ActorPosition): void {
    sprite.x = x;
    sprite.y = y;
  }

  function move(delta: number): void {
    console.log('move');
    sprite.x = sprite.x + 1 + delta;
  }

  function getSprite(): Sprite {
    return sprite;
  }

  function destroy(this: any): void {
    destroyActor(this);
  }

  return Promise.resolve({ move, setPosition, getPosition, getSprite, destroy });
}
