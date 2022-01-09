import { Actor } from './Actor';
import { ActorInputConfigResult } from './ActorInputConfigResult';

export type ActorInputConfig = (actor: Actor) => ActorInputConfigResult;
