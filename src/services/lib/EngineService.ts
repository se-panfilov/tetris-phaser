import { Graphics, Sprite, Texture, utils } from 'pixi.js';
import { Engine, TouchHandlerFn, WrappedGraphics, WrappedSprite, WrappedTexture } from '@/models';
import { isNotDefined } from '@/utils';
import { TextureSource } from '@pixi/core';

export function skipEngineWelcomeScreen(): void {
  utils.skipHello();
}

export function setInteractiveStage(engine: Engine, value: boolean): void {
  // TODO (S.Panfilov) wtf is interactive = true?
  engine.stage.interactive = value;
}

export function enableTouchMove(engine: Engine, touchHandler: TouchHandlerFn): void {
  if (isNotDefined(engine)) throw new Error('Engine is not defined');
  engine.stage.on('touchmove', touchHandler);
}

export function enableMouseMove(engine: Engine, touchHandler: TouchHandlerFn): void {
  if (isNotDefined(engine)) throw new Error('Engine is not defined');
  engine.stage.on('mousemove', touchHandler);
}

export function getBackground(fill: number, x: number, y: number, width: number, height: number): WrappedGraphics {
  const background = new Graphics();
  background.beginFill(fill);
  background.drawRect(x, y, width, height);
  background.endFill();
  return background;
}

export function attachBackground(engine: Engine, background: WrappedGraphics): void {
  if (isNotDefined(engine)) throw new Error('Engine is not defined');
  if (isNotDefined(background)) throw new Error('Background is not defined');
  engine.stage.addChild(background);
}

export function subscribeToTicker(engine: Engine, cb: (delta: number) => any): void {
  if (isNotDefined(engine)) throw new Error('Engine is not defined');
  if (isNotDefined(engine)) throw new Error(`Ticker callback must be a function, but it is ${cb}`);
  engine.ticker.add((delta: number) => cb(delta));
}

export function appendCanvasTo(engine: Engine, el: HTMLElement): void | never {
  if (isNotDefined(engine)) throw new Error('Engine is not defined');
  if (isNotDefined(el)) throw new Error('Cannot attach an engine view to an undefined element');
  el.appendChild(engine.view);
}

export function getSprite(texture: WrappedTexture): WrappedSprite | never {
  if (isNotDefined(texture)) throw new Error('Cannot make a sprite for undefined texture');
  return new Sprite(texture);
}

export function getTextureFromSpriteURL(spriteURL: TextureSource | TextureSource[]): WrappedTexture {
  return Texture.from(spriteURL);
}
