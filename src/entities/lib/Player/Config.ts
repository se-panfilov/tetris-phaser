import { ActorConfig } from '@/models';
import playerURL from '@/assets/player.png';
import { inputConfig } from '@/entities/lib/Player/InputConfig';

export const playerConfig: ActorConfig = {
  width: 39,
  height: 50,
  spriteURL: playerURL,
  position: { x: 0, y: 0 },
  inputConfig
};
