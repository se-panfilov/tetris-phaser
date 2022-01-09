// TODO (S.Panfilov) probably I don't need this entity
export function AbstractActor(id: string): IAbstractActor {
  const res = { id: 'actor_' + id, destroy };

  function destroy(): void {
    Object.keys(res).forEach((k: string) => {
      (res as any)[k] = undefined;
      delete (res as any)[k];
    });
  }

  return res;
}

export interface IAbstractActor {
  readonly id: string;
  readonly destroy: () => void;
}
