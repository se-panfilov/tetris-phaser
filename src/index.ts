import { Application } from 'pixi.js';
import { Player } from '@/entities';
import { IPlayer } from '@/entities/lib/Player/models/IPlayer';

const appConfig = {
  width: 800,
  height: 500,
  antialias: true,
  transparent: false,
  resolution: 1
};

const app = new Application(appConfig);

document.body.appendChild(app.view);

// store.dispatch[REGISTER_APP];

// Player().then((player: IPlayer) => {
//   player.setPosition({ x: 96, y: 96 });
// })

const playerPromise: Promise<IPlayer> = Player();

app.ticker.add((delta) => update(delta));

function update(delta: number) {
  playerPromise.then(({ move }) => move(delta));
}
