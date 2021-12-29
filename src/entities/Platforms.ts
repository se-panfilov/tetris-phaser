import { Scene } from 'phaser';

let platforms: any;

export function getPlatforms() {
  return platforms;
}

export function setPlatforms(value: any) {
  platforms = value;
}

export function initPlatforms(scene: Scene) {
  return scene.physics.add.staticGroup();
}
