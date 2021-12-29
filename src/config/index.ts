import Phaser from 'phaser';
import { preload } from '@/preload';
import { create } from '@/create';
import { update } from '@/update';
import GameConfig = Phaser.Types.Core.GameConfig;

const width: number = 800;
const height: number = 600;
const physics: string = 'arcade';
const gravityY: number = 300;
const isDebug: boolean = false;

export const config: GameConfig = {
  type: Phaser.AUTO,
  width,
  height,
  physics: {
    default: physics,
    arcade: {
      gravity: { y: gravityY },
      debug: isDebug
    }
  },
  scene: {
    preload,
    create,
    update
  }
};
