import { ActorPosition } from './ActorPosition';
import { BehaviorSubject } from 'rxjs';
import { Sprite } from 'pixi.js';

export interface Actor {
  readonly setPosition: ({ x, y }: ActorPosition) => void;
  readonly position$: BehaviorSubject<ActorPosition>;
  readonly sprite$: BehaviorSubject<Sprite | undefined>;
  readonly update: (delta: number) => void;
  readonly destroy: (actor: Actor) => void;
}
