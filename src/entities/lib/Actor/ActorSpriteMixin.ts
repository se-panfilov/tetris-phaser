import { ActorConfig, ActorPosition } from '@/models';
import { LoadActorSprite } from '@/services/lib/ActorService';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Sprite } from 'pixi.js';
import { isDefined, isNotDefined } from '@/utils';

export function ActorSpriteMixin(name: string, { width, height, spriteURL }: ActorConfig): IActorSpriteMixin {
  const sprite$ = new BehaviorSubject<Sprite | undefined>(undefined);
  const spritePosition$ = new BehaviorSubject<ActorPosition>({ x: 0, y: 0 });
  const spriteOrientation$ = new BehaviorSubject<number>(0);

  LoadActorSprite(name, spriteURL, { height, width }).then((sprite) => sprite$.next(sprite));

  combineLatest([sprite$, spritePosition$]).subscribe(([sprite, { x, y }]) => {
    if (isNotDefined(sprite)) return;
    sprite.x = x;
    sprite.y = y;
  });

  combineLatest([sprite$, spriteOrientation$]).subscribe(([sprite, orientation]) => {
    if (isNotDefined(sprite)) return;
    sprite.rotation = orientation;
  });

  function destroy(): void {
    if (isDefined(sprite$?.value)) sprite$.value.destroy();
    sprite$.complete();
    spritePosition$.complete();
    spriteOrientation$.complete();
  }

  return { destroy, sprite$, spritePosition$, spriteOrientation$ };
}

export interface IActorSpriteMixin {
  readonly sprite$: BehaviorSubject<Sprite | undefined>;
  readonly spritePosition$: BehaviorSubject<ActorPosition>;
  readonly spriteOrientation$: BehaviorSubject<number>;
  readonly destroy: () => void;
}
