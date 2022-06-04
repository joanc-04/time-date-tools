import { Client } from './utils/exports';

const client = new Client();
export { client };

exports.formatTime = require('./utils/functions/formatTime');
exports.formatDate = require('./utils/functions/formatDate');
exports.parseTime = require('./utils/functions/parseTime');