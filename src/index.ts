import { Engine } from 'excalibur';
import { config } from '@/Config';
import { InputEvents } from '@/constants';
import { PointerEvent } from 'excalibur/build/dist/Input/PointerEvents';
import { cursor } from '@/Cursor';
import { wrappedScene1 } from '@/scenes';
import { addSceneToGame, goToScene } from '@/services';

const game = new Engine(config);

addSceneToGame(game, wrappedScene1);

game.input.pointers.primary.on(InputEvents.Move, (evt: PointerEvent) => {
  cursor.pos.x = evt.worldPos.x;
  cursor.pos.y = evt.worldPos.y;
});

game.start();
goToScene(game, wrappedScene1);
