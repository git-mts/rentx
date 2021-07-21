import { Request, Response } from 'express';

import { DeleteRoleUseCase } from './DeleteRoleUseCase';

export abstract class DeleteRoleController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRole = new DeleteRoleUseCase();

    await deleteRole.execute(id);

    return response.json();
  }
}
