import { Graphics, InteractionEvent, Sprite } from 'pixi.js';
import { EngineConfig } from '@/Configs';
import { Texture } from '@pixi/core';

export type WrappedInteractionEvent = InteractionEvent;
export type WrappedGraphics = Graphics;
export type WrappedSprite = Sprite;
export type WrappedTexture = Texture;

export interface WrappedEngineConfig extends EngineConfig {
  width: number;
  height: number;
  antialias: boolean;
  backgroundAlpha: number;
  resolution: number;
}
export type TouchHandlerFn = (event: WrappedInteractionEvent) => void;
