import { Application, Loader, LoaderResource, Sprite, Texture } from 'pixi.js';
import { Dict } from '@pixi/utils';
import { isDefined, isNotDefined } from '@/utils';
import { SpriteSize } from '@/models';
import { getApplication } from '@/globals';
import { store } from '@/store';
import { texturesSlice } from '@/store/graphics';

export function loadSprite(name: string, spriteURL: string): Promise<Sprite> {
  return new Promise((resolve) =>
    loadTexture(name, spriteURL).then((texture: Texture | undefined) => resolve(new Sprite(texture)))
  );
}

export function loadTexture(name: string, spriteURL: string): Promise<Texture | undefined> {
  // TODO (S.Panfilov) any and this code doesnt't work
  console.log(store.getState());
  const texture: Texture | undefined = (store.getState() as any).textures.textures[name] as any;
  if (isDefined(texture)) return Promise.resolve(texture);

  // TODO (S.Panfilov) let's not recreate loader each time!
  const loader = new Loader();
  return new Promise((resolve, reject) => {
    return loader.add(name, spriteURL).load((loader: Loader, resources: Dict<LoaderResource>) => {
      if (isNotDefined(resources[name]?.texture)) return reject(new Error(`Cannot load resource for "${spriteURL}"`));
      // TODO (S.Panfilov) any
      console.log('123123');
      store.dispatch((texturesSlice as any).actions.addTexture({ name, value: resources[name]?.texture }));
      resolve(resources[name]?.texture);
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
