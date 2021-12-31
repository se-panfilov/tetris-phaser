import { Actor, Engine, Scene } from 'excalibur';
// import { WrappedScene } from '@/scenes';

export const addActor = (scene: Scene, actor: Actor): void => scene.add(actor);

// export const initWrappedScene = (scene: WrappedScene): void => scene.data.forEach((actor: Actor) => addActor(scene.value, actor));
export const initWrappedScene = (scene: any): void =>
  scene.data.forEach((actor: Actor) => addActor(scene.value, actor));

// export const initWrappedScenes = (scenes: ReadonlyArray<WrappedScene>): void => scenes.forEach(initWrappedScene);
export const initWrappedScenes = (scenes: ReadonlyArray<any>): void => scenes.forEach(initWrappedScene);

// export function addSceneToGame(game: Engine, scene: WrappedScene, shouldGoToScene: boolean = false): void {
export function addSceneToGame(game: Engine, scene: any, shouldGoToScene: boolean = false): void {
  initWrappedScene(scene);
  game.add(scene.id, scene.value);
  if (shouldGoToScene) goToScene(game, scene);
}

// export function goToScene(game: Engine, scene: WrappedScene): void {
export function goToScene(game: Engine, scene: any): void {
  game.goToScene(scene.id);
}
