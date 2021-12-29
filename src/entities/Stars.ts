import { STAR } from '@/constants';
import { Scene } from 'phaser';

let stars: any;

export function getStars() {
  return stars;
}

export function setStars(value: any) {
  stars = value;
}

export function initStars(scene: Scene) {
  return scene.physics.add.group({
    key: STAR.id,
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });
}
