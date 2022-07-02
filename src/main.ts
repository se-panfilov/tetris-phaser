import { initMouse } from '@/input/lib/Mouse';
import { Engine, WrappedApplication } from '@/models';
import { setDelta } from '@/globals';
import {
  appendCanvasTo,
  attachBackground,
  getBackground,
  skipEngineWelcomeScreen,
  subscribeToTicker
} from '@/services/lib/EngineService';
import { initBullets, initPlayer } from '@/player';

export function startApp({ engine }: WrappedApplication<Engine>): void {
  skipEngineWelcomeScreen();
  initMouse(engine);

  const background = getBackground(0x123456, 0, 0, 800, 600);
  attachBackground(engine, background);
  appendCanvasTo(engine, document.body);
  subscribeToTicker(engine, update);

  const player = initPlayer();
  const bullets = initBullets(player);

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
}
