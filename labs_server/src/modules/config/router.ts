import { Router } from 'express';
import { getFilters } from './getFiltersConfig';

const ConfigRouter = Router();

ConfigRouter.get('/filters', getFilters);

export { ConfigRouter };
