import { Application, Graphics, utils } from 'pixi.js';
import { iPlayer, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, Player } from '@/entities';
import { setApplication, setDelta } from '@/globals';
import { Key$ } from '@/input';
import { KEY_A, KEY_D, KEY_S, KEY_W } from '@/input/lib/Keyboard/KeyCode/Letters';
import { distinctKeyEvents } from '@/input/lib/Utils';
import { initMouse, mousePosition$ } from '@/input/lib/Mouse';
import { combineLatest, map } from 'rxjs';
import { getAngleToMouse } from '@/utils/lib/Math';
import { bulletConfig } from '@/entities/lib/Bullet/Config';
import { Bullet } from '@/entities/lib/Bullet';
import { GO_BY_AZIMUTH } from '@/entities/lib/Bullet/BulletActions';

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
initMouse(app);

const background = new Graphics();
background.beginFill(0x123456);
background.drawRect(0, 0, 800, 600);
background.endFill();
app.stage.addChild(background);

document.body.appendChild(app.view);

app.ticker.add((delta) => update(delta));

const player: iPlayer = Player();
player.position$.next({ x: 96, y: 96 });
// player.destroy();

// TODO (S.Panfilov) example 1
Key$(KEY_W)
  .pipe(distinctKeyEvents)
  .subscribe((keyState) => {
    player.action$.next({ value: MOVE_UP, isActive: keyState.isDown });
  });

// TODO (S.Panfilov) example 2
Key$(KEY_S)
  // .pipe(distinctKeyEvents, isKeyDown)
  .pipe(distinctKeyEvents)
  .subscribe((keyState) => {
    player.action$.next({ value: MOVE_DOWN, isActive: keyState.isDown });
  });

// TODO (S.Panfilov) example 2
Key$(KEY_A)
  .pipe(distinctKeyEvents)
  .subscribe((keyState) => {
    player.action$.next({ value: MOVE_LEFT, isActive: keyState.isDown });
  });

// TODO (S.Panfilov) example 2
Key$(KEY_D)
  .pipe(distinctKeyEvents)
  .subscribe((keyState) => {
    player.action$.next({ value: MOVE_RIGHT, isActive: keyState.isDown });
  });

combineLatest([mousePosition$, player.position$])
  .pipe(map(([mousePosition, playerPosition]) => getAngleToMouse(mousePosition, playerPosition)))
  .subscribe((degrees: number) => player.orientation$.next(degrees));

let bullets: ReadonlyArray<ReturnType<typeof Bullet>> = [];
player.shoot$.subscribe(() => {
  const bullet = Bullet({ ...bulletConfig, position: player.position$.value, orientation: player.orientation$.value });
  bullets = [...bullets, bullet];
  bullet.action$.next({ value: GO_BY_AZIMUTH, isActive: true });
});

setTimeout(() => {
  player.shoot$.next();
}, 3000);

function update(delta: number): void {
  setDelta(delta);
  player.update$.next(delta);
  bullets.forEach((bullet) => bullet.update$.next(delta));
  // playerPromise.then(({ move }) => move(delta));
}

// TODO (S.Panfilov) this function is unused (perhaps need a reset instead of destroy)
function destroy(): void {
  // TODO (S.Panfilov) check, that "keyboard$.complete()" also completes all watched keys (Key$)
  // keyboard$.complete();
}
