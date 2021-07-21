import { Router } from 'express';

import { operatorsRouter } from './operators.routes';
import { rolesRouter } from './roles.routes';

const routes = Router();

routes.get('/welcome', (request, response) => {
  return response.json({ message: 'Welcome to rentx!!!' });
});

routes.use('/roles', rolesRouter);
routes.use('/operators', operatorsRouter);

export { routes };
