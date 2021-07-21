import { Request, Response } from 'express';

import { CreateRoleUseCase } from './CreateRoleUseCase';

export abstract class CreateRoleController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, permissions } = request.body;

    const createRole = new CreateRoleUseCase();

    const role = await createRole.execute({ name, description, permissionsId: permissions });

    return response.json(role);
  }
}
