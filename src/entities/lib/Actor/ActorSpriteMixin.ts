import { ActorConfig, ActorPosition } from '@/models';
import { LoadActorSprite } from '@/services/lib/ActorService';
import { BehaviorSubject } from 'rxjs';
import { Sprite } from 'pixi.js';
import { isDefined, isNotDefined } from '@/utils';
import { unloadSprite } from '@/services';
import { IAbstractActor } from '@/entities/lib/Actor/AbstractActor';

export function ActorSpriteMixin(actor: IAbstractActor, { width, height, spriteURL }: ActorConfig): IActorSpriteMixin {
  const sprite$ = new BehaviorSubject<Sprite | undefined>(undefined);

  LoadActorSprite(actor.id, spriteURL, { height, width }).then((sprite) => sprite$.next(sprite));

  function setSpritePosition({ x, y }: ActorPosition): void {
    if (isNotDefined(sprite$.value)) return;
    sprite$.value.x = x;
    sprite$.value.y = y;
  }

  const update = (position: ActorPosition): void => setSpritePosition(position);

  const res = { sprite$, update };

  function destroy(): void {
    const sprite = res.sprite$?.value;
    if (isDefined(sprite)) unloadSprite(sprite);
    res.sprite$?.complete();
  }

  return { ...res, destroy };
}

export interface IActorSpriteMixin {
  readonly sprite$: BehaviorSubject<Sprite | undefined>;
  readonly update: (position: ActorPosition) => void;
  readonly destroy: () => void;
}
