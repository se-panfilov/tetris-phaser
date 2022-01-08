import { Actor, ActorConfig, ActorPosition } from '@/models';
import { playerConfig } from '@/entities/lib/Player/Config';
import { destroyActor, LoadActorSprite } from '@/services/lib/ActorService';
import { Sprite } from 'pixi.js';
import { BehaviorSubject } from 'rxjs';
import { getDelta } from '@/globals';

export async function Player({ width, height, spriteURL }: ActorConfig = playerConfig): Promise<Actor> {
  const id: string = 'Player';
  const sprite: Sprite = await LoadActorSprite(id, spriteURL, { height, width });
  const position$ = new BehaviorSubject<ActorPosition>({ x: 0, y: 0 });

  position$.subscribe((value: ActorPosition) => _setSpritePosition(value));

  function getPosition(): BehaviorSubject<ActorPosition> {
    return position$;
  }

  const setPosition = (position: ActorPosition): void => position$.next(position);

  function _setSpritePosition({ x, y }: ActorPosition): void {
    sprite.x = x;
    sprite.y = y;
  }

  const MOVE_STEP: number = 1;

  function moveUp(): void {
    const { x, y } = position$.value;
    setPosition({ x, y: y - getDelta() - MOVE_STEP });
  }

  function moveDown(): void {
    const { x, y } = position$.value;
    setPosition({ x, y: y + getDelta() + MOVE_STEP });
  }

  function getSprite(): Sprite {
    return sprite;
  }

  function destroy(this: any): void {
    destroyActor(this);
  }

  return Promise.resolve({ moveUp, moveDown, setPosition, getPosition, getSprite, destroy });
}
