import { Request, Response } from 'express';

import { AuthenticateOperatorUseCase } from './AuthenticateOperatorUseCase';

export abstract class AuthenticateOperatorController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authOperator = new AuthenticateOperatorUseCase();

    const token = await authOperator.execute({ username, password });

    return response.json({ token });
  }
}
