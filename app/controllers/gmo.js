"use strict";
/**
 * GMOウェブフックコントローラー
 * @namespace controller/gmo
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ttts = require("@motionpicture/ttts-domain");
const notificationResponse_1 = require("../models/gmo/notificationResponse");
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
function notify(req, res, __) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.OrderID === undefined) {
            res.send(notificationResponse_1.default.RECV_RES_OK);
            return;
        }
        // 何を最低限保管する？
        try {
            const notification = ttts.GMO.factory.resultNotification.creditCard.createFromRequestBody(req.body);
            yield ttts.Models.GMONotification.create(Object.assign({}, notification, {
                process_status: ttts.GMONotificationUtil.PROCESS_STATUS_UNPROCESSED
            }));
            res.send(notificationResponse_1.default.RECV_RES_OK);
        }
        catch (error) {
            res.send(notificationResponse_1.default.RECV_RES_NG);
        }
    });
}
exports.notify = notify;
