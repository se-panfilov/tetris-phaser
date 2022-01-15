import { BehaviorSubject, Subject } from 'rxjs';
import { ActorPosition } from '@/models';
import { PlayerActions } from '@/entities';

export interface Actor {
  readonly id: string;
  readonly action$: Subject<PlayerActions>;
  readonly update$: BehaviorSubject<number>;
  readonly position$: BehaviorSubject<ActorPosition>;
  readonly destroy: (actor: Actor) => void;
}
