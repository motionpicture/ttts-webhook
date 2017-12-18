/**
 * SendGridルーティング
 * @ignore
 */

import * as express from 'express';
import * as sendGridController from '../controllers/sendGrid';

const sendGridRouter = express.Router();

sendGridRouter.post('/event/notify', sendGridController.notifyEvent);

export default sendGridRouter;
