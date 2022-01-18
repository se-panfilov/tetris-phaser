import { Application, Loader, LoaderResource, Sprite } from 'pixi.js';
import { Dict } from '@pixi/utils';
import { isNotDefined } from '@/utils';
import { SpriteSize } from '@/models';
import { getApplication } from '@/globals';

export function loadSprite(name: string, spriteURL: string): Promise<Sprite> {
  const loader = new Loader();
  return new Promise((resolve, reject) => {
    loader.add(name, spriteURL).load((loader: Loader, resources: Dict<LoaderResource>) => {
      // const loader = Loader.shared.resources[spriteURL];
      if (isNotDefined(loader) || isNotDefined(resources[name]?.texture))
        return reject(new Error(`Cannot load resource for "${spriteURL}"`));
      const sprite = new Sprite(resources[name]?.texture);
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
