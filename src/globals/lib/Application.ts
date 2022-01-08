import { Application } from 'pixi.js';
import { createDeferredPromise, isNotDefined } from '@/utils';

let app: Application | undefined;
const isApplicationReady = createDeferredPromise<Application>();
const { promise, resolve, reject } = isApplicationReady;

export function setApplication(application: Application): void {
  if (isNotDefined(application)) return reject();
  app = application;
  resolve(app);
}

export function getApplication(): Promise<Application> {
  return promise.then((app: Application) => app);
}
