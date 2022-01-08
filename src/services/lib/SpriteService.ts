import { Application, Loader, Sprite } from 'pixi.js';
import { isNotDefined } from '@/utils';
import { SpriteSize } from '@/models';
import { getApplication } from '@/globals';

export function loadSprite(spriteURL: string): Promise<Sprite> {
  return new Promise((resolve, reject) => {
    Loader.shared.add(spriteURL).load(() => {
      const loader = Loader.shared.resources[spriteURL];
      if (isNotDefined(loader)) return reject(new Error(`Cannot load resource for "${spriteURL}"`));
      const sprite = new Sprite(loader.texture);
      resolve(sprite);
    });
  });
}

export function setSpriteSize(sprite: Sprite, { width, height }: SpriteSize): void {
  sprite.width = width;
  sprite.height = height;
}

export function setSpriteAnchor(sprite: Sprite, x: number, y: number): void {
  sprite.anchor.x = x;
  sprite.anchor.y = y;
}

export function addSpriteToStage(sprite: Sprite): Promise<Sprite> {
  return getApplication().then((app: Application) => app.stage.addChild(sprite));
}

export function unloadSprite(sprite: Sprite): void {
  sprite.destroy();
}
