import { SpriteSize, WrappedSprite, WrappedTexture } from '@/models';
import { getSprite, getTextureFromSpriteURL } from '@/services/lib/EngineService';

export function loadSprite(name: string, spriteURL: string): Promise<WrappedSprite> {
  return new Promise((resolve) =>
    loadTexture(name, spriteURL).then((texture: WrappedTexture) => resolve(getSprite(texture)))
  );
}

export function loadTexture(name: string, spriteURL: string): any {
  // TODO (S.Panfilov) any and this code doesn't work
  // console.log(store.getState());
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
  //     console.log('123123', texturesSlice);
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

export function addSpriteToStage(sprite: WrappedSprite): Promise<WrappedSprite> {
  // return getApplication().then((app: Application) => app.stage.addChild(sprite));
  // TODO (S.Panfilov) debug
  return Promise.resolve({} as any);
}

export function unloadSprite(sprite: WrappedSprite): void {
  sprite.destroy();
}
