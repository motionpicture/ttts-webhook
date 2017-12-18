"use strict";
/**
 * ルーティング
 * @ignore
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const gmoController = require("../controllers/gmo");
const gmoRouter = express.Router();
gmoRouter.post('/notify', gmoController.notify);
exports.default = gmoRouter;
