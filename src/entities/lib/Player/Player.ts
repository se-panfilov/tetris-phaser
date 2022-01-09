import { Actor, ActorConfig, ActorInputConfigResult } from '@/models';
import { playerConfig } from '@/entities/lib/Player/Config';
import { AbstractActor, IAbstractActor } from '@/entities/lib/Actor/AbstractActor';
import { ActorSpriteMixin, IActorSpriteMixin } from '@/entities/lib/Actor/ActorSpriteMixin';
import { ActorPositionMixin, IActorPositionMixin } from '@/entities/lib/Actor/ActorPositionMixin';

export function Player(config: ActorConfig = playerConfig): Actor {
  const id: string = 'Player';

  const actor: IAbstractActor = AbstractActor(id);
  const actorSpriteMixin: IActorSpriteMixin = ActorSpriteMixin(actor, config);
  const actorPositionMixin: IActorPositionMixin = ActorPositionMixin();

  const actorParts = {
    ...actor,
    ...actorSpriteMixin,
    ...actorPositionMixin
  };

  // const MOVE_STEP: number = 1;
  //
  // function moveUp(): void {
  //   const { x, y } = position$.value;
  //   setPosition({ x, y: y - getDelta() - MOVE_STEP });
  // }

  actorPositionMixin.position$.subscribe((value) => actorSpriteMixin.update(value));

  function update(delta: number): void {
    actorPositionMixin.position$.next(positionWithDelta);
    // actorSpriteMixin.update();
  }

  function destroy(): void {
    actor.destroy();
    actorSpriteMixin.destroy();
    actorPositionMixin.destroy();
  }

  const res = { ...actorParts, update, destroy };

  const inputs$: ReadonlyArray<ActorInputConfigResult> = config.inputConfig.map((input) => input(res));

  return { ...res, inputs$ };
}
