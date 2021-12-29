import { Scene } from 'phaser';
import { BOMB } from '@/phaser-game/constants';
import Group = Phaser.GameObjects.Group;

let bombs: Group;

export function getBombs() {
  return bombs;
}

export function setBombs(value: Group) {
  bombs = value;
}

export function initBombs(scene: Scene): Group {
  return scene.physics.add.group();
}

export function createBomb(position: number): void {
  const bomb = bombs.create(position, 16, BOMB.id);
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  bomb.allowGravity = false;
}
