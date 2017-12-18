/**
 * SendGridウェブフックコントローラー
 * @namespace controller/sendGrid
 */

import { Models } from '@motionpicture/ttts-domain';
import * as createDebug from 'debug';
import { Request, Response } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status';

const debug = createDebug('ttts-webhook:controller:sendGrid');

/**
 * SendGridイベントフック
 */
export async function notifyEvent(req: Request, res: Response) {
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
}
