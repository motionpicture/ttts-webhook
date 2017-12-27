/**
 * expressアプリケーション
 * @module app
 */

import * as ttts from '@motionpicture/ttts-domain';
import * as bodyParser from 'body-parser';
import * as express from 'express';

import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';

import gmoRouter from './routes/gmo';
import sendGridRouter from './routes/sendGrid';

import mongooseConnectionOptions from '../mongooseConnectionOptions';

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
app.use('/gmo', gmoRouter);
app.use('/sendGrid', sendGridRouter);

// 404
app.use(notFoundHandler);

// error handlers
app.use(errorHandler);

ttts.mongoose.connect(<string>process.env.MONGOLAB_URI, mongooseConnectionOptions);

export = app;
