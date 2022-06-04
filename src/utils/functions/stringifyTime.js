const timesInMilliseconds = [31556926000, 2629800000, 604800000, 86400000, 3600000, 60000, 1000, 1];

const stringifyTimeOptions = {
    lang: "en",
    long: false,
    format: "Y-MO-W-D-H-M-S-MS",
    separator: ", ",
    valueNull: false,
    suppressTag: false
}

async function stringifyTime(time, options = stringifyTimeOptions) {

    const { client } = require('../../../index.js');

    let splitTime = [];
    for (let i = 0; i < timesInMilliseconds.length; i ++) {
        if (!timesInMilliseconds?.[i]) splitTime.push(0)
        else {
            splitTime.push(Math.floor(time / timesInMilliseconds[i]));
            time -= splitTime[i] * timesInMilliseconds[i];
        }
    }

    if (!options.lang) options.lang = 'en';
    if (!options.valueNull) options.valueNull = false;
    if (!options.suppressTag) options.suppressTag = false;
    if (!options.long) options.long = false;

    const letters = ["Y", "MO", "W", "D", "H", "M", "S", "MS"];

    const format = options.format ? options.format.split('-') : ["Y", "MO", "W", "D", "H", "M", "S", "MS"];

    let timeArray = [];
    for (const i of format) {
        const index = letters.indexOf(i);
        const key = splitTime[index];
        if (key && key != 0) timeArray.push(`${key == 0 && !options.valueNull ? '' : key + (options.suppressTag ? "" : options.long ? ' ' + client.lang[options.lang]?.[index]?.[options.long ? key < 2 ? 0 : 1 : 2] : '')}`);
    }

    const separator = options.separator && typeof(options.separator) == 'string' ? options.separator : ', ';

    return timeArray.join(separator);

};

module.exports = {
    stringifyTime: stringifyTime
}