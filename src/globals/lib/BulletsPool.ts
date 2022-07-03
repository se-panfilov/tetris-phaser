import { BehaviorSubject, Subject } from 'rxjs';
import { Actor } from '@/models';

export const addBulletToPool$ = new Subject<Actor>();
export const removeBulletFromPool$ = new Subject<Actor>();
export const bulletsPool$ = new BehaviorSubject<ReadonlyMap<string, Actor>>(new Map());

addBulletToPool$.subscribe((bullet: Actor) => {
  bulletsPool$.next(new Map(bulletsPool$.value).set(bullet.id, bullet));
});

removeBulletFromPool$.subscribe((bullet: Actor) => {
  const map = new Map(bulletsPool$.value);
  map.delete(bullet.id);
  bulletsPool$.next(map);
});
