import { ActorPosition } from '@/models';
import { BehaviorSubject } from 'rxjs';
import { IActorSpriteMixin } from '@/entities/lib/Actor/ActorSpriteMixin';

export function ActorPositionMixin(): IActorPositionMixin {
  const position$ = new BehaviorSubject<ActorPosition>({ x: 0, y: 0 });
  // const update = (delta: number, sprite: IActorSpriteMixin): void => sprite.setSpritePosition(position$.value);
  const destroy = (): void => position$.complete();

  return { position$, destroy };
}

export interface IActorPositionMixin {
  readonly position$: BehaviorSubject<ActorPosition>;
  // readonly update: (delta: number, sprite: IActorSpriteMixin) => void;
  readonly destroy: () => void;
}
