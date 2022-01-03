import { Sprite } from 'pixi.js';
import { ActorPosition } from './ActorPosition';

export interface IPlayer {
  readonly sprite: Sprite;
  readonly setPosition: ({ x, y }: ActorPosition) => void;
  readonly move: (delta: number) => void;
}
