import { Request, Response } from 'express';

import { UpdateRoleUseCase } from './UpdateRoleUseCase';

export abstract class UpdateRoleController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, permissions } = request.body;

    const updateRole = new UpdateRoleUseCase();

    const role = await updateRole.execute({
      id,
      name,
      description,
      permissionsId: permissions,
    });

    return response.json(role);
  }
}
