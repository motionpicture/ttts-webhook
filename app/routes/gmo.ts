/**
 * ルーティング
 * @ignore
 */

import * as express from 'express';
import * as gmoController from '../controllers/gmo';

const gmoRouter = express.Router();

gmoRouter.post('/notify', gmoController.notify);

export default gmoRouter;
