import { Loader, Sprite } from 'pixi.js';

export function getActorSprite(img: string, width?: number, height?: number) {
  const spritePromise: Promise<Sprite> = new Promise((resolve, reject) => {
    Loader.shared.add(img).load(() => {
      try {
        // TODO (S.Panfilov) any
        const sprite: Sprite = new Sprite((Loader as any).shared.resources[img].texture);
        if (width) sprite.width = width;
        if (height) sprite.height = height;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        resolve(sprite);
        // TODO (S.Panfilov) any
      } catch (e: any) {
        reject(new Error(e));
      }
    });
  });

  return { spritePromise };
}
