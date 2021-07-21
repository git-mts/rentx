import { Router } from 'express';

import { CreateRoleController } from '@modules/operators/roles/useCases/createRole';
import { DeleteRoleController } from '@modules/operators/roles/useCases/deleRole';
import { ListPermissionsController } from '@modules/operators/roles/useCases/listPermissions';
import { ListRolesController } from '@modules/operators/roles/useCases/listRoles';
import { UpdateRoleController } from '@modules/operators/roles/useCases/updateRole';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { has } from '../middlewares/has';

const rolesRouter = Router();

rolesRouter.use(ensureAuthenticated);

rolesRouter.get('/', has(['read_role']), ListRolesController.handle);
rolesRouter.post('/', has(['write_role']), CreateRoleController.handle);
rolesRouter.put('/:id', has(['write_role']), UpdateRoleController.handle);
rolesRouter.delete('/:id', has(['delete_role']), DeleteRoleController.handle);
rolesRouter.get('/permissions', has(['read_permission']), ListPermissionsController.handle);

export { rolesRouter };
