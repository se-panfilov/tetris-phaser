import { BehaviorSubject, Subject } from 'rxjs';
import { ActorPosition } from '@/models';

export interface Actor {
  readonly id: string;
  // readonly sprite$: BehaviorSubject<Sprite | undefined>;
  // TODO (S.Panfilov)
  readonly input$: Subject<any>;
  readonly update$: BehaviorSubject<number>;
  readonly position$: BehaviorSubject<ActorPosition>;
  readonly destroy: (actor: Actor) => void;
}
