import { Scene } from 'phaser';
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;

let cursors: CursorKeys;

export function getCursors(): CursorKeys {
  return cursors;
}

export function setCursors(value: CursorKeys) {
  cursors = value;
}

export function initCursors(scene: Scene): CursorKeys {
  return scene.input.keyboard.createCursorKeys();
}
