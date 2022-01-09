import { Actor, ActorInputConfig, ActorInputConfigResult } from '@/models';
import { Key$ } from '@/input';
import { KEY_W } from '@/input/lib/Keyboard/KeyCode/Letters';
import { isKeyDown } from '@/input/lib/Utils';

export const inputConfig: ReadonlyArray<ActorInputConfig> = [moveUp];

export function moveUp(player: Actor): ActorInputConfigResult {
  const subject = Key$(KEY_W);
  subject.pipe(isKeyDown);

  const subscription = subject.subscribe((v) => {
    (player as any).moveUp();
  });

  return { subject, subscription };
}
