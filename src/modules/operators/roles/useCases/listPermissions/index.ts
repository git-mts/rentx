import { Request, Response } from 'express';

import { ListPermissionsUseCase } from './ListPermissionsUseCase';

export abstract class ListPermissionsController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const listPermissions = new ListPermissionsUseCase();

    const permissions = await listPermissions.execute();

    return response.json(permissions);
  }
}
