import { Scene } from 'phaser';
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;

let cursors: CursorKeys;

export function getCursors(): any {
  return cursors;
}

export function setCursors(value: any) {
  cursors = value;
}

export function initCursors(scene: Scene): any {
  return scene.input.keyboard.createCursorKeys();
}
