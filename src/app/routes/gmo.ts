/**
 * GMOルーター
 * @namespace routes.gmo
 */

import * as ttts from '@motionpicture/ttts-domain';
import * as createDebug from 'debug';
import * as express from 'express';

const gmoRouter = express.Router();
const debug = createDebug('tttts-webhook:router:gmo');

/**
 * 受信OK
 */
const RECV_RES_OK = '0';
/**
 * 受信失敗
 */
const RECV_RES_NG = '1';

gmoRouter.post('/notify', async (req, res) => {
    debug('body:', JSON.stringify(req.body));

    if (req.body.OrderID === undefined) {
        res.send(RECV_RES_OK);

        return;
    }

    // リクエストボディをDBに保管
    try {
        const notification = ttts.GMO.factory.resultNotification.creditCard.createFromRequestBody(req.body);
        const gmoNotificationRepo = new ttts.repository.GMONotification(ttts.mongoose.connection);
        await gmoNotificationRepo.save(notification);
        debug('notification created.', notification);
        res.send(RECV_RES_OK);
    } catch (error) {
        res.send(RECV_RES_NG);
    }
});

export default gmoRouter;
