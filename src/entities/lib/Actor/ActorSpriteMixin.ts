import { ActorConfig, ActorPosition } from '@/models';
import { LoadActorSprite } from '@/services/lib/ActorService';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Sprite } from 'pixi.js';
import { isDefined, isNotDefined } from '@/utils';

export function ActorSpriteMixin({ width, height, spriteURL }: ActorConfig): IActorSpriteMixin {
  const sprite$ = new BehaviorSubject<Sprite | undefined>(undefined);
  const spritePosition$ = new BehaviorSubject<ActorPosition>({ x: 0, y: 0 });

  LoadActorSprite(spriteURL, { height, width }).then((sprite) => sprite$.next(sprite));

  combineLatest([sprite$, spritePosition$]).subscribe(([sprite, { x, y }]) => {
    if (isNotDefined(sprite)) return;
    sprite.x = x;
    sprite.y = y;
  });

  function destroy(): void {
    if (isDefined(sprite$?.value)) sprite$.value.destroy();
    sprite$.complete();
    spritePosition$.complete();
  }

  return { destroy, sprite$, spritePosition$ };
}

export interface IActorSpriteMixin {
  readonly sprite$: BehaviorSubject<Sprite | undefined>;
  readonly spritePosition$: BehaviorSubject<ActorPosition>;
  readonly destroy: () => void;
}
