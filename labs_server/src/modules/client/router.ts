import { Router } from 'express';
import { getClient } from './getClient';
import { getClientList } from './getClientList';

const ClientRouter = Router();

ClientRouter.get('/list', getClientList);
ClientRouter.get('/:id', getClient);

export { ClientRouter };
