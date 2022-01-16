import { Actor, ActorConfig, ActorPosition } from '@/models';
import { playerConfig } from '@/entities/lib/Player/Config';
import { ActorSpriteMixin } from '@/entities/lib/Actor/ActorSpriteMixin';
import { BehaviorSubject, combineLatest, distinctUntilChanged, Subject } from 'rxjs';
import { ActorActionState } from '@/input';
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from '@/entities';
import { iPlayer } from '@/entities/lib/Player/IPlayer';

export function Player(config: ActorConfig = playerConfig): iPlayer {
  const id: string = 'Player';

  const { spritePosition$, spriteOrientation$, destroy: destroySprite } = ActorSpriteMixin(id, config);
  const position$ = new BehaviorSubject<ActorPosition>(config.position);
  const action$ = new Subject<ActorActionState>();
  //  This subject triggers on update loop step with the value of current delta (needed to not be dependent on user frame rate)
  const update$ = new BehaviorSubject<number>(0);
  const orientation$ = new BehaviorSubject<number>(config.orientation);
  const shoot$ = new Subject<void>();

  position$.subscribe((value: ActorPosition) => spritePosition$.next(value));
  orientation$.subscribe((value: number) => spriteOrientation$.next(value));

  const PLAYER_MOVE_SPEED = 1;
  let isMoveUp = false;
  let isMoveDown = false;
  let isMoveLeft = false;
  let isMoveRight = false;

  combineLatest([action$, update$])
    .pipe(distinctUntilChanged(([actionPrev], [inputCurr]) => actionPrev === inputCurr))
    .subscribe(([action, delta]) => {
      console.log(action);
      if (action.value === MOVE_UP) isMoveUp = action.isActive;
      if (action.value === MOVE_DOWN) isMoveDown = action.isActive;
      if (action.value === MOVE_LEFT) isMoveLeft = action.isActive;
      if (action.value === MOVE_RIGHT) isMoveRight = action.isActive;
    });

  update$.subscribe((delta) => {
    if (isMoveUp) position$.next({ x: position$.value.x, y: position$.value.y - PLAYER_MOVE_SPEED - delta });
    if (isMoveDown) position$.next({ x: position$.value.x, y: position$.value.y + PLAYER_MOVE_SPEED + delta });
    if (isMoveLeft) position$.next({ x: position$.value.x - PLAYER_MOVE_SPEED - delta, y: position$.value.y });
    if (isMoveRight) position$.next({ x: position$.value.x + PLAYER_MOVE_SPEED + delta, y: position$.value.y });
  });

  function destroy(): void {
    destroySprite();
    position$.complete();
    action$.complete();
    update$.complete();
    shoot$.complete();
  }

  return {
    id,
    action$,
    position$,
    orientation$,
    update$,
    shoot$,
    destroy
  };
}
