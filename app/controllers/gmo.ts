/**
 * GMOウェブフックコントローラー
 * @namespace controller/gmo
 */

import * as ttts from '@motionpicture/ttts-domain';
import { NextFunction, Request, Response } from 'express';

import GMONotificationResponseModel from '../models/gmo/notificationResponse';

/**
 * GMO結果通知受信
 *
 * お客様は、受信したHTTPリクエストに対するHTTPレスポンスが必要となります。
 * 返却値については、以下のいずれか
 * 0：受信OK ／ 1：受信失敗
 *
 * タイムアウトについて
 * 結果通知プログラム機能によって、指定URLへデータ送信を行った場合に15秒以内に返信が無いとタイムアウトとして処理を行います。
 * 加盟店様側からの正常応答が確認出来なかった場合は約60分毎に5回再送いたします。
 */
export async function notify(req: Request, res: Response, __: NextFunction) {
    if (req.body.OrderID === undefined) {
        res.send(GMONotificationResponseModel.RECV_RES_OK);

        return;
    }

    // 何を最低限保管する？
    try {
        const notification = ttts.GMO.factory.resultNotification.creditCard.createFromRequestBody(req.body);
        await ttts.Models.GMONotification.create(
            {
                ...notification,
                ...{
                    process_status: ttts.GMONotificationUtil.PROCESS_STATUS_UNPROCESSED
                }
            }
        );

        res.send(GMONotificationResponseModel.RECV_RES_OK);
    } catch (error) {
        res.send(GMONotificationResponseModel.RECV_RES_NG);
    }
}
