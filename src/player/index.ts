import { Actor } from '@/models';
import { Character, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from '@/entities';
import { CharacterWithWeapon, ICharacterWithWeaponMixin } from '@/entities/lib/CharacterWithWeapon';
import { Key$, KEY_A, KEY_D, KEY_Q, KEY_S, KEY_W } from '@/input';
import { distinctKeyEvents } from '@/input/lib/Utils';
import { SHOOT } from '@/entities/lib/CharacterWithWeapon/CharacterWithWeaponActions';
import { combineLatest, map } from 'rxjs';
import { mousePosition$ } from '@/input/lib/Mouse';
import { getAngleToMouse } from '@/utils/lib/Math';
import { Bullet } from '@/entities/lib/Bullet';
import { bulletConfig } from '@/entities/lib/Bullet/Config';
import { GO_BY_AZIMUTH } from '@/entities/lib/Bullet/BulletActions';

export function initPlayer(): ICharacterWithWeaponMixin {
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

  return player;
}

export function initBullets(player: ICharacterWithWeaponMixin): ReadonlyArray<ReturnType<typeof Bullet>> {
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

  return bullets;
}
