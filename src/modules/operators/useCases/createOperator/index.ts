import { Request, Response } from 'express';

import { CreateOperatorUseCase } from './CreateOperatorUseCase';

export abstract class CreateOperatorController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, role_id, password } = request.body;

    const createOperator = new CreateOperatorUseCase();

    const { password: _, ...operator } = await createOperator.execute({
      username,
      email,
      password,
      role_id,
    });

    return response.status(201).json(operator);
  }
}
