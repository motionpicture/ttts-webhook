"use strict";
/**
 * SendGridルーティング
 * @ignore
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sendGridController = require("../controllers/sendGrid");
const sendGridRouter = express.Router();
sendGridRouter.post('/event/notify', sendGridController.notifyEvent);
exports.default = sendGridRouter;
