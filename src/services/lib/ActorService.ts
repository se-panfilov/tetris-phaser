import { Sprite } from 'pixi.js';

const DefaultOptions = {
  anchor: {
    height: 0.5,
    width: 0.5
  }
};

// store.dispatch({ type: incremented });
// // {value: 1}
// store.dispatch(increment());
// store.dispatch(increment());
// store.dispatch(decrement());
// store.dispatch(increment());
// {value: 2}
// store.dispatch({ type: 'counter/decremented' });

export function LoadActorSprite(
  actorId: string,
  spriteURL: string,
  size: Size,
  options: Options = DefaultOptions
): Promise<Sprite> {
  // TODO (S.Panfilov) store!
  // const app: Application = store.getter[GET_APP];
  const app: any = {};

  return Promise.resolve({} as any);

  // return new Promise<Sprite>((resolve) => {
  //   Loader.shared.add(spriteURL).load(() => {
  //     if (!app) throw new Error(`Failed to add an actor sprite ("${spriteURL}"). Application is not defined.`);
  //     // TODO (S.Panfilov) forced "!"
  //     const sprite = new Sprite(Loader.shared.resources[spriteURL]!.texture);
  //     app.stage.addChild(sprite);
  //     // TODO (S.Panfilov) store!
  //     // store.dispatch(REGISTER_SPRITE, { actorId, sprite });
  //     resolve(sprite);
  //   });
  // });
}

interface Size {
  readonly width: number;
  readonly height: number;
}

interface Options {
  readonly anchor?: {
    readonly width: number;
    readonly height: number;
  };
}
