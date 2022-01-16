import { BehaviorSubject, Subject } from 'rxjs';
import { ActorPosition } from '@/models';
import { ActorActionState } from '@/input';

export interface Actor {
  readonly id: string;
  readonly action$: Subject<ActorActionState>;
  readonly update$: BehaviorSubject<number>;
  readonly position$: BehaviorSubject<ActorPosition>;
  readonly orientation$: BehaviorSubject<number>;
  readonly destroy: (actor: Actor) => void;
}
