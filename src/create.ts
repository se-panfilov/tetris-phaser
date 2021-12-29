import { Scene } from 'phaser';
import {
  getBombs,
  getPlatforms,
  getPlayer,
  getStars,
  initBombs,
  initCursors,
  initPlatforms,
  initPlayer,
  initScoreText,
  initStars,
  setBombs,
  setCursors,
  setPlatforms,
  setPlayer,
  setScoreText,
  setStars
} from '@/entities';
import { PLATFORM, SKY } from '@/constants';
import { createPlayerAnimations } from '@/PlayerControls';
import { collectStar } from '@/events/collectStar';
import { hitBomb } from '@/events/hitBomb';

export function create(this: Scene) {
  this.add.image(400, 300, SKY.id);

  //Platforms
  setPlatforms(initPlatforms(this));
  const platforms = getPlatforms();
  platforms.create(400, 568, PLATFORM.id).setScale(2).refreshBody();
  platforms.create(600, 400, PLATFORM.id);
  platforms.create(50, 250, PLATFORM.id);
  platforms.create(750, 220, PLATFORM.id);

  //Player
  setPlayer(initPlayer(this));
  const player = getPlayer();
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //Animations
  createPlayerAnimations(this);

  //controls
  setCursors(initCursors(this));

  //Stars
  setStars(initStars(this));
  const stars = getStars();
  stars.children.iterate(function (child: any) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  //Bombs
  setBombs(initBombs(this));
  const bombs = getBombs();

  //Score Text
  setScoreText(initScoreText(this, 'Score: 0'));

  //Rules
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);

  this.physics.add.overlap(player, stars, collectStar, null as any, this);
  this.physics.add.collider(player, bombs, hitBomb, null as any, this);
}
