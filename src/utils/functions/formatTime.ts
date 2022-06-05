import { Console, client, formatTimeOptions } from '../exports.js';
import l from '../res/errors/message.json';

const timesInMilliseconds = [31556926000, 2629800000, 86400000, 3600000, 60000, 1000, 1];

const formatTimeOptionsDefault = {
    lang: "en",
    format: null
}

/**
 *
 * @param {*} time The time in milliseconds to convert into any format
 * @param {*} options The options of the format returned
 * @returns The time with the format you want
 */
export function formatTime(time: number, options: formatTimeOptions) {

    if (!time) return Console.error(l.ERROR_MISSING_ARGUMENT_TIME);

    time = Math.round(time);

    let splitTime = [];
    for (let i = 0; i < timesInMilliseconds.length; i ++) {
        if (!timesInMilliseconds?.[i]) splitTime.push(0);
        else {
            splitTime.push(Math.floor(time / timesInMilliseconds[i]));
            time -= splitTime[i] * timesInMilliseconds[i];
        }
    }

    for (let i of Object.entries(formatTimeOptionsDefault)) if ((<any>options)[i[0]] == undefined) (<any>options)[i[0]] = i[1];

    const textLanguage = client.lang[options.lang || formatTimeOptionsDefault.lang]?.timeKeys;

    const obj: any = {
        y: splitTime[0],
        mo: splitTime[1],
        d: splitTime[2],
        h: splitTime[3],
        m: splitTime[4],
        s: splitTime[5],
        ms: splitTime[6],
        YY: textLanguage[0],
        MMOO: textLanguage[1],
        DD: textLanguage[3],
        HH: textLanguage[4],
        MM: textLanguage[5],
        SS: textLanguage[6],
        MMSS: textLanguage[7],
    }

    for (const i of Object.entries(obj).slice(0, 7)) obj[i[0].toUpperCase()] = (<any>i)[1] < 10 ? '0' + i[1] : `${i[1]}`;

    for (const i of Object.entries(obj).slice(7, 14)) {
        obj[i[0].toLowerCase()] = (<any>i)[1][2];
        obj[i[0]] = i[0].length == 2 ? (<any>i)[1][obj[i[0].toLowerCase()[0]] > 1 ? 1 : 0] : (<any>i)[1][obj[i[0].toLowerCase().substring(1, i[0] == 'YY' ? 2 : 3)] > 1 ? 1 : 0];
    }

    let format = options.format;

    if (typeof(format) != 'string') return obj;
    else format = format.trim();

    // if (!['undefined', 'boolean'].includes(typeof(options.valueNull))) return Console.error(l.ERROR_VALUE_NULL_TYPE_NOT_A_BOOLEAN);

    const regex = /YY|MMOO|DD|HH|MMSS|MM|SS|yy|mmoo|dd|hh|mmss|mm|ss|Y|MO|D|H|MS|M|S|y|mo|d|h|ms|m|s/,
        separators = format.split(regex).slice(1);

    let timeKeys = [],
        values = [],
        null_ = false;

    for (let i = 0; i < separators.length; i ++) {

        const separator = separators[i],
            reg = new RegExp(`(${String(regex).substring(1, String(regex).length - 1)})` + separator.replace(/\[/g, '\\[')),
            match = format.match(reg)?.[0];

        if (!match) continue;

        const keyVal = match.replace(separator, '').replace(/ /g, ''),
            value = obj[keyVal],
            isMany = (typeof(value) == 'string' && obj[keyVal.toLowerCase().substring(1, keyVal.length == 2 ? 2 : keyVal.length == 4 && keyVal == 'YY' ? 2 : 3)]) > 0 || value > 0 ? true : false;

        format = format.replace(reg, '');

        timeKeys.push(isMany || null_ ? match : '');
        values.push(isMany || null_ ? value : '');

        if (separator.includes('[')) null_ = true;
        if (separator.includes(']')) null_ = false;

    }

    for (let i = 0; i < timeKeys.length; i ++) {
        const match: any = timeKeys[i].match(regex)?.[0];
        if (match) timeKeys[i] = timeKeys[i].replace(match, values[i]);
    }

    return timeKeys.join('').replace(/^([^0-9]+)/, '').replace(/\[|\]/g, '');

};