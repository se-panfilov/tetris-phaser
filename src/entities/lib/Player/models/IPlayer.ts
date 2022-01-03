import { ActorPosition } from './ActorPosition';

export interface IPlayer {
  readonly setPosition: ({ x, y }: ActorPosition) => void;
  readonly move: (delta: number) => void;
}
