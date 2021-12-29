import { Scene } from 'phaser';
import { DUDE } from '@/constants';

let player: any;

export function getPlayer() {
  return player;
}

export function setPlayer(value: any) {
  player = value;
}

export function initPlayer(scene: Scene) {
  return scene.physics.add.sprite(100, 450, DUDE.id);
}
