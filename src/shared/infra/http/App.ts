import express, { Express } from 'express';

import { routes } from './routes';

abstract class App {
  private static server: Express;

  static get Server(): Express {
    if (!this.server) {
      this.server = express();

      this.initializeServer();

      return this.server;
    }

    return this.server;
  }

  public static port = process.env.PORT || 3333;

  private static initializeServer(): void {
    this.server.use(express.json());
    this.server.use(routes);
  }
}

export { App };
