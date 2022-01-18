import { combineLatest, distinctUntilChanged, Subject } from 'rxjs';
import { Actor } from '@/models';
import { SHOOT } from '@/entities/lib/CharacterWithWeapon/CharacterWithWeaponActions';

export function CharacterWithWeapon(actor: Actor): ICharacterWithWeaponMixin {
  const shoot$ = new Subject<void>();

  let isShooting: boolean = false;

  combineLatest([actor.action$, actor.update$])
    .pipe(distinctUntilChanged(([actionPrev], [inputCurr]) => actionPrev === inputCurr))
    .subscribe(([action, delta]) => {
      console.log(action);
      if (action.value === SHOOT) isShooting = action.isActive;
    });

  actor.update$.subscribe((delta) => {
    if (isShooting) {
      console.log('shooting!!!');
      shoot$.next();
    }
  });

  function destroy(): void {
    actor.destroy(actor);
    shoot$.complete();
  }

  return {
    ...actor,
    destroy,
    shoot$
  };
}

export interface ICharacterWithWeaponMixin extends Actor {
  readonly shoot$: Subject<void>;
}
