import { Scene } from 'phaser';
import { BOMB, DUDE, PLATFORM, SKY, STAR } from '@/phaser-game/constants';

export function preload(this: Scene) {
  this.load.image(SKY.id, SKY.img);
  this.load.image(PLATFORM.id, PLATFORM.img);
  this.load.image(STAR.id, STAR.img);
  this.load.image(BOMB.id, BOMB.img);
  this.load.spritesheet(DUDE.id, DUDE.img, DUDE.frameConfig);
}
