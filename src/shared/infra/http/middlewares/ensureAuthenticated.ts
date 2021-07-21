import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/base/error/AppError';

interface IPayload {
  permissions: any[];
  sub: string;
}

function ensureAuthenticated(request: Request, _: Response, next: NextFunction): void {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('Missing token', 401);

  const [, token] = authorization.split(' ');

  try {
    const { permissions, sub } = verify(token, 'secret-key') as IPayload;

    request.user = { permissions, id: sub };
    next();
  } catch (err) {
    throw new AppError('Token invalid!', 401);
  }
}

export { ensureAuthenticated };
