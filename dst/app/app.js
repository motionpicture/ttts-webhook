"use strict";
/**
 * expressアプリケーション
 * @module app
 */
const middlewares = require("@motionpicture/express-middleware");
const ttts = require("@motionpicture/ttts-domain");
const bodyParser = require("body-parser");
const express = require("express");
const errorHandler_1 = require("./middlewares/errorHandler");
const notFoundHandler_1 = require("./middlewares/notFoundHandler");
const gmo_1 = require("./routes/gmo");
const sendgrid_1 = require("./routes/sendgrid");
const mongooseConnectionOptions_1 = require("../mongooseConnectionOptions");
const app = express();
app.use(middlewares.basicAuth({
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
app.use('/gmo', gmo_1.default);
app.use('/sendgrid', sendgrid_1.default);
// 404
app.use(notFoundHandler_1.default);
// error handlers
app.use(errorHandler_1.default);
ttts.mongoose.connect(process.env.MONGOLAB_URI, mongooseConnectionOptions_1.default);
module.exports = app;
