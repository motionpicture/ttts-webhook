"use strict";
/**
 * expressアプリケーション
 *
 * @module app
 * @global
 */
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const basicAuth_1 = require("./middlewares/basicAuth");
const benchmarks_1 = require("./middlewares/benchmarks");
const errorHandler_1 = require("./middlewares/errorHandler");
const notFoundHandler_1 = require("./middlewares/notFoundHandler");
const gmo_1 = require("./routes/gmo");
const sendGrid_1 = require("./routes/sendGrid");
const app = express();
app.use(benchmarks_1.default); // ベンチマーク的な
app.use(basicAuth_1.default); // ベーシック認証
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
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing multipart/form-data
app.use(express.static(__dirname + '/../public'));
// ルーティング登録の順序に注意！
app.use('/gmo', gmo_1.default);
app.use('/sendGrid', sendGrid_1.default);
// 404
app.use(notFoundHandler_1.default);
// error handlers
app.use(errorHandler_1.default);
/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
// Use native promises
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
});
module.exports = app;
