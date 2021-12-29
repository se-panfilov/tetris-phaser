import Phaser from 'phaser';
// import GameConfig = Phaser.Types.Core.GameConfig;
import { preload } from '@/preload';
import { create } from '@/create';
import { update } from '@/update';

export const config: any = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};
