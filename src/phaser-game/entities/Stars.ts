import { STAR } from '@/phaser-game/constants';
import { Scene } from 'phaser';
import Group = Phaser.GameObjects.Group;

let stars: Group;

export function getStars(): Group {
  return stars;
}

export function setStars(value: Group) {
  stars = value;
}

export function initStars(scene: Scene): Group {
  return scene.physics.add.group({
    key: STAR.id,
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });
}
