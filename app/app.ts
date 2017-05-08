/**
 * expressアプリケーション
 *
 * @module app
 * @global
 */

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import basicAuth from './middlewares/basicAuth';
import benchmarks from './middlewares/benchmarks';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';

import gmoRouter from './routes/gmo';
import sendGridRouter from './routes/sendGrid';

const app = express();

app.use(benchmarks); // ベンチマーク的な
app.use(basicAuth); // ベーシック認証

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
app.use('/gmo', gmoRouter);
app.use('/sendGrid', sendGridRouter);

// 404
app.use(notFoundHandler);

// error handlers
app.use(errorHandler);

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
// Use native promises
(<any>mongoose).Promise = global.Promise;
mongoose.connect(
    process.env.MONGOLAB_URI,
    {
        server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
    }
);

export = app;
