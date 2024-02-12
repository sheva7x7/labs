import { Router } from 'express';
import { attachAsset } from './attachAsset';
import { getHunt } from './getHunt';
import { getHuntList } from './getHuntList';
import { getRelatedAssets } from './getRelatedAssets';

const HuntRouter = Router();

HuntRouter.get('/list/:clientId', getHuntList);

HuntRouter.get('/:id', getHunt);

HuntRouter.get('/:id/assets/related', getRelatedAssets);

HuntRouter.post('/:id/asset/add', attachAsset);

export { HuntRouter };
