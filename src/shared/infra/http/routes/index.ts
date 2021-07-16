import { Router } from 'express';

const routes = Router();

routes.get('/welcome', (request, response) => {
  return response.json({ message: 'Welcome to rentx!!!' });
});

export { routes };
