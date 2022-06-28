import { Engine, SpriteSize, WrappedApplication, WrappedSprite, WrappedTexture } from '@/models';
import { getSprite, getTextureFromSpriteURL } from '@/services/lib/EngineService';
import { app$ } from '@/globals';
import { isDefined } from '@/utils';

export function loadSprite(name: string, spriteURL: string): Promise<WrappedSprite> {
  return new Promise((resolve) =>
    loadTexture(name, spriteURL).then((texture: WrappedTexture) => resolve(getSprite(texture)))
  );
}

export function loadTexture(name: string, spriteURL: string): any {
  // TODO (S.Panfilov) any and this code doesn't work
  // const texture: WrappedTexture | undefined = (store.getState() as any).textures.textures[name] as any;
  // if (isDefined(texture)) return Promise.resolve(texture);
  const texture = getTextureFromSpriteURL(spriteURL);
  return Promise.resolve(texture);
  // TODO (S.Panfilov) let's not recreate loader each time!
  // const loader = new Loader();
  // return new Promise((resolve, reject) => {
  //   return loader.add(name, spriteURL).load((loader: Loader, resources: Dict<LoaderResource>) => {
  //     if (isNotDefined(resources[name]?.texture)) return reject(new Error(`Cannot load resource for "${spriteURL}"`));
  //     // TODO (S.Panfilov) any
  //     store.dispatch((texturesSlice as any).actions.addTexture({ name, value: resources[name]?.texture?.textureCacheIds as any }));
  //     resolve(resources[name]?.texture);
  //   });
  // });
}

export function setSpriteSize(sprite: WrappedSprite, { width, height }: SpriteSize): void {
  sprite.width = width;
  sprite.height = height;
}

export function setSpriteAnchor(sprite: WrappedSprite, x: number, y: number): void {
  sprite.anchor.x = x;
  sprite.anchor.y = y;
}

// TODO (S.Panfilov) refactor, this should be done reactive way
export function addSpriteToStage(sprite: WrappedSprite): Promise<WrappedSprite> {
  return new Promise((resolve) =>
    app$.subscribe((app: WrappedApplication<Engine> | undefined) => {
      if (isDefined(app)) resolve(app.engine.stage.addChild(sprite));
    })
  );
}

export function unloadSprite(sprite: WrappedSprite): void {
  sprite.destroy();
}
