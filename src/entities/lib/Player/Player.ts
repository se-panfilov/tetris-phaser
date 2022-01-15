import { Actor, ActorConfig, ActorPosition } from '@/models';
import { playerConfig } from '@/entities/lib/Player/Config';
import { ActorSpriteMixin } from '@/entities/lib/Actor/ActorSpriteMixin';
import { BehaviorSubject, combineLatest, distinctUntilChanged, Subject } from 'rxjs';
import { PlayerActions, PlayerActionState } from '@/entities';

export function Player(config: ActorConfig = playerConfig): Actor {
  const id: string = 'Player';

  const { spritePosition$, destroy: destroySprite } = ActorSpriteMixin(config);
  const position$ = new BehaviorSubject<ActorPosition>({ x: 0, y: 0 });
  const action$ = new Subject<PlayerActionState>();
  // TODO (S.Panfilov) this is update with delta value
  const update$ = new BehaviorSubject<number>(0);

  position$.subscribe((value: ActorPosition) => spritePosition$.next(value));

  const PLAYER_MOVE_SPEED = 5;

  combineLatest([action$, update$])
    .pipe(
      // TODO (S.Panfilov) Should distinct inputs (directions, fire, etc)
      // distinct inputs here

      // Fire only when action$ changed
      distinctUntilChanged(([actionPrev], [inputCurr]) => actionPrev === inputCurr)
    )
    .subscribe(([action, delta]) => {
      // TODO (S.Panfilov) !!!!!!!!!!!!!!!!!!!!
      // TODO (S.Panfilov) CWP need to calculate a position based on current value and delta (update$)
      // TODO (S.Panfilov) we should manipulate by actors via action$, not position$
      // TODO (S.Panfilov) !!!!!!!!!!!!!!!!!!!!
      console.log(action);
      if (action.value === PlayerActions.MOVE_DOWN) {
        position$.next({ x: position$.value.x, y: position$.value.y - PLAYER_MOVE_SPEED - delta });
      }
    });

  function destroy(): void {
    destroySprite();
    position$.complete();
    action$.complete();
  }

  return {
    id,
    action$,
    position$,
    update$,
    destroy
  };
}
