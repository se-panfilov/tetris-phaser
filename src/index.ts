import { Application, utils } from 'pixi.js';
import { Player } from '@/entities';
import { setApplication } from '@/App';
import { Actor } from '@/models';

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

const playerPromise: Promise<Actor> = Player();
playerPromise.then((p: Actor) => {
  p.setPosition({ x: 96, y: 96 });
  console.log(p);
  p.destroy();
  console.log(p);
});

app.ticker.add((delta) => update(delta));

function update(delta: number) {
  // playerPromise.then(({ move }) => move(delta));
}
