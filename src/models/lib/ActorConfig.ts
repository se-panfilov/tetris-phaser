import { ActorPosition } from './ActorPosition';
import { ActorInputConfig } from './ActorInputConfig';

export interface ActorConfig {
  readonly width: number;
  readonly height: number;
  readonly spriteURL: string;
  readonly position?: ActorPosition;
  readonly inputConfig: ReadonlyArray<ActorInputConfig>;
}
