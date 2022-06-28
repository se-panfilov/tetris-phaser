import { WrappedApplication } from '@/models';

export function getApplication<T>(engine: T): WrappedApplication<T> {
  return { engine };
}
