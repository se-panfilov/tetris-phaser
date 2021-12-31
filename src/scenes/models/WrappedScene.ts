import { Actor, Scene } from 'excalibur';

export interface WrappedScene {
  readonly id: string;
  readonly value: Scene;
  readonly data: ReadonlyArray<Actor>;
}
