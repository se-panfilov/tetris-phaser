import { DUDE } from '@/constants';
import { Scene } from 'phaser';

enum Controls {
  Left = 'left',
  Turn = 'turn',
  Right = 'right'
}

export function createPlayerAnimations(scene: Scene) {
  scene.anims.create({
    key: Controls.Left,
    frames: scene.anims.generateFrameNumbers(DUDE.id, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: Controls.Turn,
    frames: [{ key: DUDE.id, frame: 4 }],
    frameRate: 20
  });

  scene.anims.create({
    key: Controls.Right,
    frames: scene.anims.generateFrameNumbers(DUDE.id, { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
}

export function playerAnimation(cursors: any, player: any) {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play(Controls.Left, true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play(Controls.Right, true);
  } else {
    player.setVelocityX(0);
    player.anims.play(Controls.Turn);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
