import 'reflect-metadata';
import 'express-async-errors';

import '../container';
import '../typeorm';

import { App } from './App';

App.Server.listen(App.port, () => console.log(`🚀 Server is running on port ${App.port}`));
