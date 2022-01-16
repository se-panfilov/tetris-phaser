import { Actor, ActorConfig, ActorPosition } from '@/models';
import { ActorSpriteMixin } from '@/entities/lib/Actor/ActorSpriteMixin';
import { BehaviorSubject, combineLatest, distinctUntilChanged, Subject } from 'rxjs';
import { bulletConfig } from '@/entities/lib/Bullet/Config';
import { ActorActionState } from '@/input';
import { GO_BY_AZIMUTH } from '@/entities/lib/Bullet/BulletActions';

export function Bullet(config: ActorConfig = bulletConfig): Actor {
  const id: string = 'Bullet';

  const { spritePosition$, spriteOrientation$, destroy: destroySprite } = ActorSpriteMixin(config);
  const position$ = new BehaviorSubject<ActorPosition>({ x: 0, y: 0 });
  const action$ = new Subject<ActorActionState>();
  //  This subject triggers on update loop step with the value of current delta (needed to not be dependent on user frame rate)
  const update$ = new BehaviorSubject<number>(0);
  const orientation$ = new BehaviorSubject<number>(0);

  position$.subscribe((value: ActorPosition) => spritePosition$.next(value));
  orientation$.subscribe((value: number) => spriteOrientation$.next(value));

  const MOVE_SPEED = 1;
  let isGoByAzimuth = false;

  combineLatest([action$, update$])
    .pipe(distinctUntilChanged(([actionPrev], [inputCurr]) => actionPrev === inputCurr))
    .subscribe(([action, delta]) => {
      console.log(action);
      if (action.value === GO_BY_AZIMUTH) isGoByAzimuth = action.isActive;
    });

  update$.subscribe((delta) => {
    if (isGoByAzimuth) position$.next({ x: position$.value.x, y: position$.value.y - MOVE_SPEED - delta });
  });

  function destroy(): void {
    destroySprite();
    position$.complete();
    action$.complete();
    update$.complete();
  }

  return {
    id,
    action$,
    position$,
    orientation$,
    update$,
    destroy
  };
}
