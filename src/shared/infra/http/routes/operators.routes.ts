import { Router } from 'express';

import { AuthenticateOperatorController } from '@modules/operators/useCases/authenticateOperator';
import { CreateOperatorController } from '@modules/operators/useCases/createOperator';
import { DeleteOperatorController } from '@modules/operators/useCases/deleteOperator';
import { ListOperatorsController } from '@modules/operators/useCases/listOperators';
import { UpdateOperatorController } from '@modules/operators/useCases/updateOperator';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { has } from '../middlewares/has';

const operatorsRouter = Router();

operatorsRouter.post('/auth', AuthenticateOperatorController.handle);

operatorsRouter.use(ensureAuthenticated);

operatorsRouter.get('/', has(['read_operator']), ListOperatorsController.handle);
operatorsRouter.post('/', has(['write_operator']), CreateOperatorController.handle);

operatorsRouter.delete('/:id', has(['delete_operator']), DeleteOperatorController.handle);
operatorsRouter.put(
  '/:id',
  (req, res, next) => {
    if (req.user.id === req.params.id) return UpdateOperatorController.handle(req, res);

    return next();
  },
  has(['write_operator']),
  UpdateOperatorController.handle,
);

export { operatorsRouter };
