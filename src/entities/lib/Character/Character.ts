import { Actor, ActorConfig, ActorPosition } from '@/models';
import { characterConfig } from '@/entities/lib/Character/Config';
import { ActorSpriteMixin } from '@/entities/lib/ActorMixins/ActorSpriteMixin';
import { BehaviorSubject, combineLatest, distinctUntilChanged, Subject } from 'rxjs';
import { ActorActionState } from '@/input';
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from '@/entities';
import { nanoid } from 'nanoid';

export function Character(config: ActorConfig = characterConfig): Actor {
  const type: string = 'Character';

  const { spritePosition$, spriteOrientation$, destroy: destroySprite } = ActorSpriteMixin(type, config);
  const position$ = new BehaviorSubject<ActorPosition>(config.position);
  const action$ = new Subject<ActorActionState>();
  //  This subject triggers on update loop step with the value of current delta (needed to not be dependent on user frame rate)
  const update$ = new BehaviorSubject<number>(0);
  const orientation$ = new BehaviorSubject<number>(config.orientation);

  position$.subscribe((value: ActorPosition) => spritePosition$.next(value));
  orientation$.subscribe((value: number) => spriteOrientation$.next(value));

  const MOVE_SPEED = 1;
  let isMovingUp = false;
  let isMovingDown = false;
  let isMovingLeft = false;
  let isMovingRight = false;

  // TODO (S.Panfilov) do we really need update$ here?
  combineLatest([action$, update$])
    .pipe(distinctUntilChanged(([actionPrev], [inputCurr]) => actionPrev === inputCurr))
    .subscribe(([action, delta]) => {
      if (action.value === MOVE_UP) isMovingUp = action.isActive;
      if (action.value === MOVE_DOWN) isMovingDown = action.isActive;
      if (action.value === MOVE_LEFT) isMovingLeft = action.isActive;
      if (action.value === MOVE_RIGHT) isMovingRight = action.isActive;
    });

  update$.subscribe((delta: number) => {
    if (isMovingUp) position$.next({ x: position$.value.x, y: position$.value.y - MOVE_SPEED - delta });
    if (isMovingDown) position$.next({ x: position$.value.x, y: position$.value.y + MOVE_SPEED + delta });
    if (isMovingLeft) position$.next({ x: position$.value.x - MOVE_SPEED - delta, y: position$.value.y });
    if (isMovingRight) position$.next({ x: position$.value.x + MOVE_SPEED + delta, y: position$.value.y });
  });

  function destroy(): void {
    destroySprite();
    position$.complete();
    action$.complete();
    orientation$.complete();
    update$.complete();
  }

  return {
    id: nanoid(),
    type,
    action$,
    position$,
    orientation$,
    update$,
    destroy
  };
}
