import { BehaviorSubject, Subject } from 'rxjs';
import { ActorPosition } from '@/models';
import { PlayerActionState } from '@/entities';

export interface Actor {
  readonly id: string;
  readonly action$: Subject<PlayerActionState>;
  readonly update$: BehaviorSubject<number>;
  readonly position$: BehaviorSubject<ActorPosition>;
  readonly orientation$: BehaviorSubject<number>;
  readonly destroy: (actor: Actor) => void;
}
