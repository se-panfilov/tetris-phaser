import Phaser from 'phaser';
import { createBomb, getScore, getStars, updateScores } from '@/entities';

export function collectStar(player: any, star: any) {
  star.disableBody(true, true);
  updateScores(getScore() + 10);
  const stars = getStars();

  if (stars.countActive(true) === 0) {
    //  A new batch of stars to collect
    stars.children.iterate(function (child: any) {
      child.enableBody(true, child.x, 0, true, true);
    });

    const bombPosition = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    createBomb(bombPosition);
  }
}
