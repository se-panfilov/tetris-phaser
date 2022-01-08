import { ActorPosition } from './ActorPosition';
import { BehaviorSubject } from 'rxjs';
import { Sprite } from 'pixi.js';

export interface Actor {
  readonly setPosition: ({ x, y }: ActorPosition) => void;
  readonly getPosition: () => BehaviorSubject<ActorPosition>;
  readonly getSprite: () => Sprite;
  // readonly move: (delta: number) => void;
  readonly destroy: (actor: Actor) => void;
}
