import { ActorConfig, ActorPosition } from '@/models';
import { LoadActorSprite } from '@/services/lib/ActorService';
import { BehaviorSubject } from 'rxjs';
import { Sprite } from 'pixi.js';
import { isDefined } from '@/utils';

export function ActorSpriteMixin({ width, height, spriteURL }: ActorConfig): IActorSpriteMixin {
  const sprite$ = new BehaviorSubject<Sprite | undefined>(undefined);
  const spritePosition$ = new BehaviorSubject<ActorPosition>({ x: 0, y: 0 });

  LoadActorSprite(spriteURL, { height, width }).then((sprite) => sprite$.next(sprite));

  spritePosition$
    // .pipe() is sprite defined
    // together with sprite
    .subscribe(({ x, y }: ActorPosition) => {
      // TODO (S.Panfilov) refactor
      if (!sprite$.value) return;
      sprite$.value.x = x;
      sprite$.value.y = y;
    });

  function destroy(): void {
    if (isDefined(sprite$?.value)) sprite$.value.destroy();
    sprite$.complete();
  }

  return { destroy, sprite$, spritePosition$ };
}

export interface IActorSpriteMixin {
  readonly sprite$: BehaviorSubject<Sprite | undefined>;
  readonly spritePosition$: BehaviorSubject<ActorPosition>;
  readonly destroy: () => void;
}
