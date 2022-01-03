import { Application } from 'pixi.js';
import { Player } from '@/entities';

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

const player = await Player();

app.ticker.add((delta) => update(delta));

function update(delta: number) {
  player.move(delta);
}
