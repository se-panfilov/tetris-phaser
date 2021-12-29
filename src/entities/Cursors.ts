import { Scene } from 'phaser';

let cursors: any;

export function getCursors() {
  return cursors;
}

export function setCursors(value: any) {
  cursors = value;
}

export function initCursors(scene: Scene) {
  return scene.input.keyboard.createCursorKeys();
}
