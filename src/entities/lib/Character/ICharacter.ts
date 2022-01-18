import { Subject } from 'rxjs';
import { Actor } from '@/models';

export interface ICharacter extends Actor {
  readonly shoot$: Subject<void>;
}
