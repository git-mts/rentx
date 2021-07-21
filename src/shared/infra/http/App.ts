import express, { Express, Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/base/error/AppError';

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

    this.server.use((err: Error, request: Request, response: Response, _n: NextFunction) => {
      if (err instanceof AppError) {
        const { message, statusCode } = err;

        return response.status(statusCode).json({
          message,
        });
      }

      return response.status(500).json({
        message: `Internal error server: ${err.message}`,
      });
    });
  }
}

export { App };
