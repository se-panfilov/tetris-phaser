import { app$, engineConfig$ } from '@/globals';
import { startApp } from '@/main';
import { engineConfig } from '@/Configs';

app$.subscribe(() => startApp);
engineConfig$.next(engineConfig);
