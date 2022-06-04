import { Console, client, formatTimeOptions } from '../exports.js';
import l from '../res/errors/message.json';

const timesInMilliseconds = [31556926000, 2629800000, 604800000, 86400000, 3600000, 60000, 1000, 1];

const parseTimeOptions = {
    msOff: false
}

/**
 *
 * @param {*} mstime The time in string to convert in milliseconds or seconds
 * @param {*} options The options of the time returned
 * @returns The time in milliseconds or seconds
 */
export function parseTime(mstime: string, options = parseTimeOptions) {

    const { client } = require('../../index.js');

    if (!mstime) return Console.error(l.ERROR_MISSING_ARGUMENT_TIME)

    const splitTime: any = mstime.trim().toLowerCase().match(/\d+\s?[a-z]+/g);
    if (!splitTime?.[0]) return 0;

    let times = 0;
    for (let i = 0; i < splitTime.length; i ++) {
        if (!isNaN(splitTime[i]) && !splitTime[i].match(/\d/)?.[0]) {
            if (splitTime[i + 1]) splitTime[i + 1] = splitTime[i] + splitTime[i + 1];
            splitTime.splice(i, 1);
        }
    }

    for (const element of splitTime) {

        const number = Number(element.match(/^\d+/g));
        if (isNaN(number)) continue;

        const key = element.match(/[a-z]/g)?.[0];

        let index;
        Object.values(client.lang).find((e: any) => e.timeKeys.find((f: any, i: number) => {
            if (f.includes(key)) index = i;
        }));

        if (index) times += timesInMilliseconds[index] * number;

    }

    return options.msOff ? times / 1000 : times;

}