/**
 * SendGridルーティング
 * @ignore
 */

import { Models } from '@motionpicture/ttts-domain';
import * as createDebug from 'debug';
import * as express from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status';

const sendGridRouter = express.Router();

const debug = createDebug('ttts-webhook:routes:sendGrid');

sendGridRouter.post('/event/notify', async (req, res) => {
    const events = req.body;
    debug('sendgrid events:', req.body);

    if (!Array.isArray(events)) {
        res.status(BAD_REQUEST).end();

        return;
    }

    try {
        await Promise.all(events.map(async (event) => {
            if (event.sg_event_id === undefined) {
                throw new Error('sg_event_id undefined');
            }

            debug('creating sendgrid_event_notifications...');
            const notifications = await Models.SendGridEventNotification.findOneAndUpdate(
                {
                    sg_event_id: event.sg_event_id
                },
                event,
                {
                    upsert: true
                }
            ).exec();
            debug('sendgrid_event_notifications created.', notifications);
        }));

        res.status(OK).end();
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).end();
    }
});

export default sendGridRouter;
