import { MouseCoords } from '@/input';
import { ActorPosition } from '@/models';

export function getAngleToMouse(mouseCoords: MouseCoords, actorPosition: ActorPosition): number {
  const distY = mouseCoords.y - actorPosition.y;
  const distX = mouseCoords.x - actorPosition.x;
  return Math.atan2(distY, distX);
}
