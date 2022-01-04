import { Application } from 'pixi.js';

let app: Application;

export function setApplication(application: Application): void {
  app = application;
}

export function getApplication(): Application {
  return app;
}
