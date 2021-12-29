import { Scene } from 'phaser';
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;

let platforms: StaticGroup;

export function getPlatforms(): StaticGroup {
  return platforms;
}

export function setPlatforms(value: StaticGroup) {
  platforms = value;
}

export function initPlatforms(scene: Scene): StaticGroup {
  return scene.physics.add.staticGroup();
}
