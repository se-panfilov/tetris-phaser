import { Application, utils } from 'pixi.js';
import { Player } from '@/entities';
import { IPlayer } from '@/entities/lib/Player/models/IPlayer';
import { store } from '@/store';
import { setApp } from '@/store/App';

const appConfig = {
  width: 800,
  height: 500,
  antialias: true,
  backgroundAlpha: 1,
  resolution: 1
};

utils.skipHello();

const app = new Application(appConfig);
store.dispatch(setApp(app));

document.body.appendChild(app.view);

// Player().then((player: IPlayer) => {
//   player.setPosition({ x: 96, y: 96 });
// })

const playerPromise: Promise<IPlayer> = Player();

app.ticker.add((delta) => update(delta));

function update(delta: number) {
  // playerPromise.then(({ move }) => move(delta));
}
