import { Scene } from 'phaser';
import { BOMB } from '@/constants';

let bombs: any;

export function getBombs() {
  return bombs;
}

export function setBombs(value: any) {
  bombs = value;
}

export function initBombs(scene: Scene) {
  return scene.physics.add.group();
}

export function createBomb(position: any) {
  const bomb = bombs.create(position, 16, BOMB.id);
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  bomb.allowGravity = false;
}
