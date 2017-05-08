/**
 * GMOウェブフックコントローラー
 *
 * @namespace controller/gmo
 */

import { GMONotificationUtil, Models } from '@motionpicture/chevre-domain';
import * as createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';

import GMONotificationModel from '../models/gmo/notification';
import GMONotificationResponseModel from '../models/gmo/notificationResponse';

const debug = createDebug('chevre-webhook:controller:gmo');

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
    const gmoNotificationModel = GMONotificationModel.parse(req.body);
    debug('gmoNotificationModel is', gmoNotificationModel);

    if (gmoNotificationModel.OrderID === undefined) {
        res.send(GMONotificationResponseModel.RECV_RES_OK);
        return;
    }

    // 何を最低限保管する？
    try {
        await Models.GMONotification.create(
            {
                shop_id: gmoNotificationModel.ShopID,
                order_id: gmoNotificationModel.OrderID,
                status: gmoNotificationModel.Status,
                job_cd: gmoNotificationModel.JobCd,
                amount: gmoNotificationModel.Amount,
                pay_type: gmoNotificationModel.PayType,

                tax: gmoNotificationModel.Tax,
                access_id: gmoNotificationModel.AccessID,
                forward: gmoNotificationModel.Forward,
                method: gmoNotificationModel.Method,
                approve: gmoNotificationModel.Approve,
                tran_id: gmoNotificationModel.TranID,
                tran_date: gmoNotificationModel.TranDate,

                cvs_code: gmoNotificationModel.CvsCode,
                cvs_conf_no: gmoNotificationModel.CvsConfNo,
                cvs_receipt_no: gmoNotificationModel.CvsReceiptNo,
                payment_term: gmoNotificationModel.PaymentTerm,

                process_status: GMONotificationUtil.PROCESS_STATUS_UNPROCESSED
            }
        );

        res.send(GMONotificationResponseModel.RECV_RES_OK);
    } catch (error) {
        res.send(GMONotificationResponseModel.RECV_RES_NG);
    }
}
