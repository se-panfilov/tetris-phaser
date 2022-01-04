import { Sprite } from 'pixi.js';
import { SpriteOptions, SpriteSize } from '@/models';
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
  return new Promise<Sprite>((resolve) => {
    return loadSprite(spriteURL).then((sprite: Sprite) => {
      if (size) setSpriteSize(sprite, size);
      if (options.anchor) setSpriteAnchor(sprite, options.anchor.x, options.anchor.y);
      return addSpriteToStage(sprite).then((sprite) => resolve(sprite));
    });
  });
}
