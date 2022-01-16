import { Subject } from 'rxjs';
import { Actor } from '@/models';

export interface iPlayer extends Actor {
  readonly shoot$: Subject<void>;
}
