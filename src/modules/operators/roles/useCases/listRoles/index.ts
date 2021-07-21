import { Request, Response } from 'express';

import { ListRolesUseCase } from './ListRolesUseCase';

export abstract class ListRolesController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const listRoles = new ListRolesUseCase();

    const roles = await listRoles.execute();

    return response.json(roles);
  }
}
