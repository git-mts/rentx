import { container } from 'tsyringe';

import { BCryptProvider, IHashProvider } from './HashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);
