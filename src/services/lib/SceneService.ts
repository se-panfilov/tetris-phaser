import { Actor, Engine, Scene } from 'excalibur';
import { WrappedScene } from '@/scenes';

export const addActor = (scene: Scene, actor: Actor): void => scene.add(actor);

export const initWrappedScene = (scene: WrappedScene): void =>
  scene.data.forEach((actor: Actor) => addActor(scene.value, actor));

export const initWrappedScenes = (scenes: ReadonlyArray<WrappedScene>): void => scenes.forEach(initWrappedScene);

export function addSceneToGame(game: Engine, scene: WrappedScene, shouldGoToScene: boolean = false): void {
  initWrappedScene(scene);
  game.add(scene.id, scene.value);
  if (shouldGoToScene) goToScene(game, scene);
}

export function goToScene(game: Engine, scene: WrappedScene): void {
  game.goToScene(scene.id);
}
