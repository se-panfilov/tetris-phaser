import { Application, utils } from 'pixi.js';
import { Player, PlayerActions } from '@/entities';
import { Actor } from '@/models';
import { setApplication, setDelta } from '@/globals';
import { Key$ } from '@/input';
import { KEY_A, KEY_D, KEY_S, KEY_W } from '@/input/lib/Keyboard/KeyCode/Letters';
import { distinctKeyEvents } from '@/input/lib/Utils';
import { initMouse, mousePosition$ } from '@/input/lib/Mouse';
import { combineLatest } from 'rxjs';

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

document.body.appendChild(app.view);

app.ticker.add((delta) => update(delta));

const player: Actor = Player();
player.position$.next({ x: 96, y: 96 });
// player.destroy();

// TODO (S.Panfilov) example 1
Key$(KEY_W)
  .pipe(distinctKeyEvents)
  .subscribe((keyState) => {
    player.action$.next({ value: PlayerActions.MOVE_UP, isActive: keyState.isDown });
  });

// TODO (S.Panfilov) example 2
Key$(KEY_S)
  // .pipe(distinctKeyEvents, isKeyDown)
  .pipe(distinctKeyEvents)
  .subscribe((keyState) => {
    player.action$.next({ value: PlayerActions.MOVE_DOWN, isActive: keyState.isDown });
  });

// TODO (S.Panfilov) example 2
Key$(KEY_A)
  .pipe(distinctKeyEvents)
  .subscribe((keyState) => {
    player.action$.next({ value: PlayerActions.MOVE_LEFT, isActive: keyState.isDown });
  });

// TODO (S.Panfilov) example 2
Key$(KEY_D)
  .pipe(distinctKeyEvents)
  .subscribe((keyState) => {
    player.action$.next({ value: PlayerActions.MOVE_RIGHT, isActive: keyState.isDown });
  });

combineLatest([mousePosition$, player.position$])
  .pipe
  // TODO (S.Panfilov)
  //coerce to degs
  ()
  .subscribe((degrees: any) => {
    // .subscribe((degrees: number) => {
    //   player.orientation$.next(degrees);
    player.orientation$.next(0);
  });

function update(delta: number): void {
  setDelta(delta);
  player.update$.next(delta);
  // playerPromise.then(({ move }) => move(delta));
}

// TODO (S.Panfilov) this function is unused (perhaps need a reset instead of destroy)
function destroy(): void {
  // TODO (S.Panfilov) check, that "keyboard$.complete()" also completes all watched keys (Key$)
  // keyboard$.complete();
}
