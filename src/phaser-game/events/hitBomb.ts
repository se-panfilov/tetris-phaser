import { Scene } from 'phaser';
import { setGameOver } from '@/phaser-game/entities/GameState';

export function hitBomb(this: Scene, player: any, bomb: any) {
  console.log(bomb);
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  setGameOver();
}
