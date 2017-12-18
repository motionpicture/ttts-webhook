"use strict";
/**
 * expressアプリケーション
 * @module app
 */
const ttts = require("@motionpicture/ttts-domain");
const bodyParser = require("body-parser");
const express = require("express");
const errorHandler_1 = require("./middlewares/errorHandler");
const notFoundHandler_1 = require("./middlewares/notFoundHandler");
const gmo_1 = require("./routes/gmo");
const sendGrid_1 = require("./routes/sendGrid");
const mongooseConnectionOptions_1 = require("../mongooseConnectionOptions");
const app = express();
if (process.env.NODE_ENV !== 'production') {
    // サーバーエラーテスト
    app.get('/500', (req) => {
        // req.on('data', (chunk) => {
        // });
        req.on('end', () => {
            throw new Error('500 manually.');
        });
    });
}
// view engine setup
// app.set('views', `${__dirname}/views`);
// app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
// app.use(express.static(__dirname + '/../public'));
// ルーティング登録の順序に注意！
app.use('/gmo', gmo_1.default);
app.use('/sendGrid', sendGrid_1.default);
// 404
app.use(notFoundHandler_1.default);
// error handlers
app.use(errorHandler_1.default);
ttts.mongoose.connect(process.env.MONGOLAB_URI, mongooseConnectionOptions_1.default);
module.exports = app;
