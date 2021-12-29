import { Scene } from 'phaser';
import { DUDE } from '@/constants';
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

let player: SpriteWithDynamicBody;

export function getPlayer() {
  return player;
}

export function setPlayer(value: SpriteWithDynamicBody) {
  player = value;
}

export function initPlayer(scene: Scene): SpriteWithDynamicBody {
  return scene.physics.add.sprite(100, 450, DUDE.id);
}
