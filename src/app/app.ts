/**
 * expressアプリケーション
 * @module app
 */

import * as middlewares from '@motionpicture/express-middleware';
import * as ttts from '@motionpicture/ttts-domain';
import * as bodyParser from 'body-parser';
import * as express from 'express';

import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';

import gmoRouter from './routes/gmo';
import sendgridRouter from './routes/sendgrid';

import mongooseConnectionOptions from '../mongooseConnectionOptions';

const app = express();

app.use(middlewares.basicAuth({ // ベーシック認証
    name: process.env.BASIC_AUTH_NAME,
    pass: process.env.BASIC_AUTH_PASS
}));

// view engine setup
// app.set('views', `${__dirname}/views`);
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data

// app.use(express.static(__dirname + '/../public'));

app.use('/gmo', gmoRouter);
app.use('/sendgrid', sendgridRouter);

// 404
app.use(notFoundHandler);

// error handlers
app.use(errorHandler);

ttts.mongoose.connect(<string>process.env.MONGOLAB_URI, mongooseConnectionOptions);

export = app;
