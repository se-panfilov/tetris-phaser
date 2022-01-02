import { Engine } from 'excalibur';
import { config } from '@/Config';
import { wrappedScene1 } from '@/scenes';
import { addSceneToGame, goToScene } from '@/services';
import { getGround } from '@/Ground';
import { player } from '@/Player';

// Physics.useRealisticPhysics();
// Physics.acc = vec(0, 300);

const game = new Engine(config);

addSceneToGame(game, wrappedScene1);

const ground = getGround(game);

game.start().then(() => {
  game.currentScene.add(ground);
});

game.input.pointers.primary.on('down', (evt) => {
  player.shoot();
});

goToScene(game, wrappedScene1);
