import { Request, Response } from 'express';

import { UpdateOperatorUseCase } from './UpdateOparatorUseCase';

export abstract class UpdateOperatorController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { username, email, password, role_id } = request.body;

    const updateOperator = new UpdateOperatorUseCase();

    const { password: _password, ...operator } = await updateOperator.execute({
      id,
      username,
      email,
      password,
      role_id,
    });

    return response.json(operator);
  }
}
