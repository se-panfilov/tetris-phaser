import Phaser from 'phaser';
import { config } from '@/phaser-game/config';

export function initGame() {
  new Phaser.Game(config);
}
