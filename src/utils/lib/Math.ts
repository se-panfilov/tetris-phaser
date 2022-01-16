import { MouseCoords } from '@/input';
import { ActorPosition } from '@/models';

export function getAngleToMouse(mouseCoords: MouseCoords, actorPosition: ActorPosition): number {
  const distY = mouseCoords.y - actorPosition.y;
  const distX = mouseCoords.x - actorPosition.x;
  return Math.atan2(distY, distX);
}

export function adjustCoordsByOrientation(
  actorPosition: ActorPosition,
  orientation: number,
  speed: number,
  delta: number
): ActorPosition {
  const cos = Math.cos(orientation);
  const sin = Math.sin(orientation);
  const isLeft = sin < 0;
  const isDown = cos < 0;
  const x = actorPosition.x + Math.cos(orientation) * speed;
  const y = actorPosition.y + Math.sin(orientation) * speed;

  return {
    x: isDown ? x - delta : x + delta,
    y: isLeft ? y - delta : y + delta
  };
}
