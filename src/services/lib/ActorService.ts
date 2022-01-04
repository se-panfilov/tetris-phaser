import { Application, Sprite } from 'pixi.js';
import { getApplication } from '@/App';
import { SpriteOptions, SpriteSize } from '@/models';
import { loadSprite, setSpriteAnchor, setSpriteSize } from '@/services';

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
  const app: Application = getApplication();

  return new Promise<Sprite>((resolve) => {
    return loadSprite(spriteURL).then((sprite: Sprite) => {
      if (size) setSpriteSize(sprite, size);
      if (options.anchor) setSpriteAnchor(sprite, options.anchor.x, options.anchor.y);
      app.stage.addChild(sprite);
      // store.dispatch(LOADED_ACTOR_SPRITE, { actorId, spriteURL });
      resolve(sprite);
    });
  });
}
