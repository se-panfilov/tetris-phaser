import { initMouse } from '@/input/lib/Mouse';
import { Actor, Engine, WrappedApplication } from '@/models';
import { delta$ } from '@/globals';
import {
  appendCanvasTo,
  attachBackground,
  getBackground,
  skipEngineWelcomeScreen,
  subscribeToTicker
} from '@/services/lib/EngineService';
import { initBullets, initPlayer } from '@/player';
import { addPlayerToPool$, playersPool$ } from '@/globals/lib/PlayersPool';

export function startApp({ engine }: WrappedApplication<Engine>): void {
  skipEngineWelcomeScreen();
  initMouse(engine);

  const background = getBackground(0x123456, 0, 0, 800, 600);
  attachBackground(engine, background);
  appendCanvasTo(engine, document.body);
  subscribeToTicker(engine, (value: number) => delta$.next(value));

  const player = initPlayer();
  const bullets = initBullets(player);

  addPlayerToPool$.next(player);

  delta$.subscribe((value) => {
    playersPool$.value.forEach((player: Actor) => player.update$.next(value));
    // player.update$.next(value);
    bullets.forEach((bullet) => bullet.update$.next(value));
  });

  // TODO (S.Panfilov) this function is unused (perhaps need a reset instead of destroy)
  function destroy(): void {
    // TODO (S.Panfilov) check, that "keyboard$.complete()" also completes all watched keys (Key$)
    // keyboard$.complete();
  }
}
