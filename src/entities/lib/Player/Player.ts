import { ActorConfig } from '@/Models';
import { playerConfig } from '@/entities/lib/Player/Config';
import { LoadActorSprite } from '@/services/lib/ActorService';
import { ActorPosition } from '@/entities/lib/Player/models/ActorPosition';
import { IPlayer } from './models/IPlayer';
import { Sprite } from 'pixi.js';

export async function Player({ width, height, spriteURL }: ActorConfig = playerConfig): Promise<IPlayer> {
  const id: string = 'Player';
  const sprite: Sprite = await LoadActorSprite(id, spriteURL, { height, width });

  function setPosition({ x, y }: ActorPosition): void {
    sprite.x = x;
    sprite.y = y;
  }

  function move(delta: number): void {
    console.log('move');
    sprite.x = sprite.x + 1 + delta;
  }

  return Promise.resolve({ move, setPosition });
}
