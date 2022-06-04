"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const exports_1 = require("./utils/exports");
const client = new exports_1.Client();
exports.client = client;
exports.formatTime = require('./utils/functions/formatTime');
exports.formatDate = require('./utils/functions/formatDate');
exports.parseTime = require('./utils/functions/parseTime');
