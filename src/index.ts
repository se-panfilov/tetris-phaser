import { Application, utils } from 'pixi.js';
import { Player } from '@/entities';
import { IPlayer } from '@/entities/lib/Player/models/IPlayer';
import { setApplication } from '@/App';

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
// store.dispatch(setApp(app));

document.body.appendChild(app.view);

const playerPromise: Promise<IPlayer> = Player();
playerPromise.then((p) => p.setPosition({ x: 96, y: 96 }));

app.ticker.add((delta) => update(delta));

function update(delta: number) {
  // playerPromise.then(({ move }) => move(delta));
}
