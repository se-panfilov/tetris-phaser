import { Sprite } from 'pixi.js';
import { Actor, SpriteOptions, SpriteSize } from '@/models';
import { addSpriteToStage, loadSprite, setSpriteAnchor, setSpriteSize } from '@/services';

const DefaultOptions: SpriteOptions = {
  anchor: {
    x: 0.5,
    y: 0.5
  }
};

export function LoadActorSprite(
  actorId: string,
  spriteURL: string,
  size: SpriteSize,
  options: SpriteOptions = DefaultOptions
): Promise<Sprite> {
  return new Promise<Sprite>((resolve) =>
    loadSprite(spriteURL).then((sprite: Sprite) => {
      if (size) setSpriteSize(sprite, size);
      if (options.anchor) setSpriteAnchor(sprite, options.anchor.x, options.anchor.y);
      return addSpriteToStage(sprite).then((sprite) => resolve(sprite));
    })
  );
}

// TODO (S.Panfilov) not sure this could work
export function destroyActor(actor: Actor): void {
  // actor.getPosition().complete();

  // const sprite = actor.sprite$.value;
  // if (isDefined(sprite)) unloadSprite(sprite);
  // actor.sprite$.complete();

  Object.keys(actor).forEach((k: string) => {
    (actor as any)[k] = undefined;
    delete (actor as any)[k];
  });
}
