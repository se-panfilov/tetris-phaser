import { Application, Loader, Sprite } from 'pixi.js';
import { getApplication } from '@/App';

const DefaultOptions: Options = {
  anchor: {
    x: 0.5,
    y: 0.5
  }
};

export function LoadActorSprite(
  actorId: string,
  spriteURL: string,
  size: Size,
  options: Options = DefaultOptions
): Promise<Sprite> {
  const app: Application = getApplication();

  return new Promise<Sprite>((resolve) => {
    Loader.shared.add(spriteURL).load(() => {
      if (!app) throw new Error(`Failed to add an actor sprite ("${spriteURL}"). Application is not defined.`);
      // TODO (S.Panfilov) forced "!"
      const sprite = new Sprite(Loader.shared.resources[spriteURL]!.texture);

      if (size) {
        sprite.width = size.width;
        sprite.height = size.height;
      }

      if (options.anchor) {
        sprite.anchor.x = options.anchor.x;
        sprite.anchor.y = options.anchor.y;
      }

      app.stage.addChild(sprite);
      // TODO (S.Panfilov) store!
      // store.dispatch(REGISTER_SPRITE, { actorId, sprite });
      resolve(sprite);
    });
  });
}

interface Size {
  readonly width: number;
  readonly height: number;
}

interface Options {
  readonly anchor?: {
    readonly x: number;
    readonly y: number;
  };
}
