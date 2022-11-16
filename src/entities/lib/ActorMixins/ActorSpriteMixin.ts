import { ActorConfig, ActorPosition, WrappedSprite } from '@/models';
import { LoadActorSprite } from '@/services/lib/ActorService';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { isDefined, isNotDefined } from '@/utils';

export function ActorSpriteMixin(name: string, { width, height, spriteURL }: ActorConfig): IActorSpriteMixin {
  const sprite$ = new BehaviorSubject<WrappedSprite | undefined>(undefined);
  const position$ = new BehaviorSubject<ActorPosition>({ x: 0, y: 0 });
  const orientation$ = new BehaviorSubject<number>(0);

  LoadActorSprite(name, spriteURL, { height, width }).then((sprite) => sprite$.next(sprite));

  combineLatest([sprite$, position$, orientation$]).subscribe(([sprite, { x, y }, orientation]) => {
    if (isNotDefined(sprite)) return;
    sprite.x = x;
    sprite.y = y;
    sprite.rotation = orientation;
  });

  function destroy(): void {
    if (isDefined(sprite$?.value)) sprite$.value.destroy();
    sprite$.complete();
    position$.complete();
    orientation$.complete();
  }

  return { destroy, sprite$, position$, orientation$ };
}

export interface IActorSpriteMixin {
  readonly sprite$: BehaviorSubject<WrappedSprite | undefined>;
  readonly position$: BehaviorSubject<ActorPosition>;
  readonly orientation$: BehaviorSubject<number>;
  readonly destroy: () => void;
}
