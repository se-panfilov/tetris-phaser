import { Graphics, InteractionEvent, Sprite } from 'pixi.js';
import { EngineConfig } from '@/configs';
import { Texture } from '@pixi/core';
import { Application as PixiEngine } from 'pixi.js';

export type WrappedInteractionEvent = InteractionEvent;
export type WrappedGraphics = Graphics;
export type WrappedSprite = Sprite;
export type WrappedTexture = Texture;
export type Engine = PixiEngine;

export interface WrappedEngineConfig extends EngineConfig {
  width: number;
  height: number;
  antialias: boolean;
  backgroundAlpha: number;
  resolution: number;
}
export type TouchHandlerFn = (event: WrappedInteractionEvent) => void;
