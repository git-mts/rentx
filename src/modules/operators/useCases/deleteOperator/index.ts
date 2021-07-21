import { Request, Response } from 'express';

import { DeleteOperatorUseCase } from './DeleteOperatorUseCase';

export abstract class DeleteOperatorController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOperator = new DeleteOperatorUseCase();

    await deleteOperator.execute(id);

    return response.json();
  }
}
