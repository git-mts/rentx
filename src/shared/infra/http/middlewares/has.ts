import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/base/error/AppError';

function has(names: string[]) {
  return (request: Request, _: Response, next: NextFunction): void => {
    const { permissions } = request.user;

    const permissions_name = permissions.map(permission => permission.name);

    const filteredPermissions = permissions_name.filter(permission =>
      names.includes(permission),
    );

    if (filteredPermissions.length !== names.length) throw new AppError('unauthorized', 401);

    return next();
  };
}

export { has };
