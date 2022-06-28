import { initMouse, mousePosition$ } from '@/input/lib/Mouse';
import { Actor, Engine, WrappedApplication } from '@/models';
import { Character, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from '@/entities';
import { CharacterWithWeapon, ICharacterWithWeaponMixin } from '@/entities/lib/CharacterWithWeapon';
import { Key$ } from '@/input';
import { KEY_A, KEY_D, KEY_Q, KEY_S, KEY_W } from '@/input/';
import { distinctKeyEvents } from '@/input/lib/Utils';
import { SHOOT } from '@/entities/lib/CharacterWithWeapon/CharacterWithWeaponActions';
import { combineLatest, map } from 'rxjs';
import { getAngleToMouse } from '@/utils/lib/Math';
import { Bullet } from '@/entities/lib/Bullet';
import { bulletConfig } from '@/entities/lib/Bullet/Config';
import { GO_BY_AZIMUTH } from '@/entities/lib/Bullet/BulletActions';
import { setDelta } from '@/globals';
import {
  appendCanvasTo,
  attachBackground,
  getBackground,
  skipEngineWelcomeScreen,
  subscribeToTicker
} from '@/services/lib/EngineService';

export function startApp({ engine }: WrappedApplication<Engine>): void {
  skipEngineWelcomeScreen();
  initMouse(engine);

  const background = getBackground(0x123456, 0, 0, 800, 600);
  attachBackground(engine, background);
  appendCanvasTo(engine, document.body);
  subscribeToTicker(engine, update);

  const character: Actor = Character();
  const player: ICharacterWithWeaponMixin = CharacterWithWeapon(character);
  player.position$.next({ x: 96, y: 96 });
  // player.destroy();

  Key$(KEY_W)
    .pipe(distinctKeyEvents)
    .subscribe((keyState) => {
      player.action$.next({ value: MOVE_UP, isActive: keyState.isDown });
    });

  Key$(KEY_S)
    // .pipe(distinctKeyEvents, isKeyDown)
    .pipe(distinctKeyEvents)
    .subscribe((keyState) => {
      player.action$.next({ value: MOVE_DOWN, isActive: keyState.isDown });
    });

  Key$(KEY_A)
    .pipe(distinctKeyEvents)
    .subscribe((keyState) => {
      player.action$.next({ value: MOVE_LEFT, isActive: keyState.isDown });
    });

  Key$(KEY_D)
    .pipe(distinctKeyEvents)
    .subscribe((keyState) => {
      player.action$.next({ value: MOVE_RIGHT, isActive: keyState.isDown });
    });

  // TODO (S.Panfilov) MOUSE key!
  Key$(KEY_Q)
    .pipe(distinctKeyEvents)
    .subscribe((keyState) => {
      player.action$.next({ value: SHOOT, isActive: keyState.isDown });
    });

  combineLatest([mousePosition$, player.position$])
    .pipe(map(([mousePosition, playerPosition]) => getAngleToMouse(mousePosition, playerPosition)))
    .subscribe((degrees: number) => player.orientation$.next(degrees));

  let bullets: ReadonlyArray<ReturnType<typeof Bullet>> = [];
  player.shoot$.subscribe(() => {
    const bullet = Bullet({
      ...bulletConfig,
      position: player.position$.value,
      orientation: player.orientation$.value
    });
    bullets = [...bullets, bullet];
    bullet.action$.next({ value: GO_BY_AZIMUTH, isActive: true });
  });

  setTimeout(() => {
    // TODO (S.Panfilov) CWP make shooting by clicking, not with timeout
    player.shoot$.next();
  }, 2000);

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
