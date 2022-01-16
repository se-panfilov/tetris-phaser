import { ActorPosition } from './ActorPosition';

export interface ActorConfig {
  readonly width: number;
  readonly height: number;
  readonly spriteURL: string;
  readonly position: ActorPosition;
  readonly orientation: number;
}
