import { BehaviorSubject, Subject } from 'rxjs';
import { Actor } from '@/models';

export const addPlayerToPool$ = new Subject<Actor>();
export const removePlayerFromPool$ = new Subject<Actor>();
export const playersPool$ = new BehaviorSubject<ReadonlyMap<string, Actor>>(new Map());

addPlayerToPool$.subscribe((player: Actor) => {
  playersPool$.next(new Map(playersPool$.value).set(player.id, player));
});

removePlayerFromPool$.subscribe((player: Actor) => {
  const map = new Map(playersPool$.value);
  map.delete(player.id);
  playersPool$.next(map);
});
