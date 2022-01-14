import { Actor, ActorConfig, ActorPosition } from '@/models';
import { playerConfig } from '@/entities/lib/Player/Config';
import { ActorSpriteMixin } from '@/entities/lib/Actor/ActorSpriteMixin';
import { BehaviorSubject, Subject } from 'rxjs';

export function Player(config: ActorConfig = playerConfig): Actor {
  const id: string = 'Player';

  const { spritePosition$, destroy: destroySprite } = ActorSpriteMixin(config);
  const position$ = new BehaviorSubject<ActorPosition>({ x: 0, y: 0 });
  // TODO (S.Panfilov) any
  const input$ = new Subject<any>();
  // TODO (S.Panfilov) this is update with delta value
  const update$ = new BehaviorSubject<number>(0);

  position$.subscribe((value: ActorPosition) => spritePosition$.next(value));

  input$
    //.pipe() // TODO (S.Panfilov) distinct directions
    .subscribe((value) => {
      position$.next(value);
    });

  function destroy(): void {
    destroySprite();
    position$.complete();
    input$.complete();
  }

  return {
    id,
    input$,
    position$,
    update$,
    destroy
  };
}
