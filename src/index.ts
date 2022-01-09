import { Application, utils } from 'pixi.js';
import { Player } from '@/entities';
import { Actor } from '@/models';
import { setApplication, setDelta } from '@/globals';

const appConfig = {
  width: 800,
  height: 500,
  antialias: true,
  backgroundAlpha: 1,
  resolution: 1
};

utils.skipHello();

const app = new Application(appConfig);
setApplication(app);

document.body.appendChild(app.view);

app.ticker.add((delta) => update(delta));

const player: Actor = Player();
player.setPosition({ x: 96, y: 96 });
// player.destroy();

// TODO (S.Panfilov) example 1
// Key$(KEY_W)
//   .pipe(isKeyDown)
//   .subscribe((v) => {
//     console.log(v);
//     playerPromise.then((p) => (<any>p).moveUp());
//   });
//
// // TODO (S.Panfilov) example 2
// Key$(KEY_S)
//   .pipe(distinctKeyEvents, isKeyDown)
//   .subscribe((v) => {
//     console.log(v);
//     playerPromise.then((p) => (<any>p).moveDown());
//   });

function update(delta: number): void {
  setDelta(delta);
  player.update(delta);
  // playerPromise.then(({ move }) => move(delta));
}
