import { BehaviorSubject, Subscription } from 'rxjs';
import { KeyState } from '@/input';

export interface ActorInputConfigResult {
  readonly subject: BehaviorSubject<KeyState>;
  readonly subscription: Subscription;
}
