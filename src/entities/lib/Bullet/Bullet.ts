import { Actor, ActorConfig, ActorPosition } from '@/models';
import { ActorSpriteMixin } from '@/entities/lib/ActorMixins/ActorSpriteMixin';
import { BehaviorSubject, combineLatest, distinctUntilChanged, Subject } from 'rxjs';
import { bulletConfig } from '@/entities/lib/Bullet/Config';
import { ActorActionState } from '@/input';
import { GO_BY_AZIMUTH } from '@/entities/lib/Bullet/BulletActions';
import { adjustCoordsByOrientation } from '@/utils/lib/Math';

export function Bullet(config: ActorConfig = bulletConfig): Actor {
  const type: string = 'Bullet';

  const { spritePosition$, spriteOrientation$, destroy: destroySprite } = ActorSpriteMixin(type, config);
  const position$ = new BehaviorSubject<ActorPosition>(config.position);
  const action$ = new Subject<ActorActionState>();
  //  This subject triggers on update loop step with the value of current delta (needed to not be dependent on user frame rate)
  const update$ = new BehaviorSubject<number>(0);
  const orientation$ = new BehaviorSubject<number>(config.orientation);

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
    if (isGoByAzimuth) {
      position$.next(adjustCoordsByOrientation(position$.value, orientation$.value, MOVE_SPEED, delta));
    }
  });

  function destroy(): void {
    destroySprite();
    position$.complete();
    action$.complete();
    update$.complete();
  }

  return {
    type,
    action$,
    position$,
    orientation$,
    update$,
    destroy
  };
}
