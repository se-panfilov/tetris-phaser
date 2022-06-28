import { app$, engineConfig$ } from '@/globals';
import { startApp } from '@/main';
import { engineConfig } from '@/Configs';
import { Engine, WrappedApplication } from '@/models';
import { isDefined } from '@/utils';

app$.subscribe((app: WrappedApplication<Engine> | undefined) => {
  if (isDefined(app)) startApp(app);
});
engineConfig$.next(engineConfig);
