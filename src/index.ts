import { Engine } from 'excalibur';
import { config } from '@/Config';
import { wrappedScene1 } from '@/scenes';
import { addSceneToGame, goToScene } from '@/services';
import { getGround } from '@/Ground';

// Physics.useRealisticPhysics();
// Physics.acc = vec(0, 300);

const game = new Engine(config);

addSceneToGame(game, wrappedScene1);

const ground = getGround(game);

// game.input.pointers.primary.on(InputEvents.Move, (evt: PointerEvent) => {
//   cursor.pos.x = evt.worldPos.x;
//   cursor.pos.y = evt.worldPos.y;
// });

game.start().then(() => {
  game.currentScene.add(ground);
});

goToScene(game, wrappedScene1);
