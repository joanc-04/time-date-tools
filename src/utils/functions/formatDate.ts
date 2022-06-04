import { Console, client, formatDateOptions } from '../exports';

const formatDateOptionsDefault = {
    lang: "en",
    format: null,
    valueNull: true,
}

async function formatDate(time: number, options: formatDateOptions) {

    if (typeof(time) != "number") return Console.error('error');

    for (let i of Object.entries(formatDateOptionsDefault)) if ((<any>options)?.[i[0]] == undefined) (<any>options)!![i[0]] = i[1];

    const date = new Date(time);
    if (!date) return Console.error('Time is invalid');

    const textLanguage = client.lang[options.lang || formatDateOptionsDefault.lang]?.dateKeys;

    const obj = {

        date: date,

        milliseconds: date.getMilliseconds(),
        millisecondsFull: ("000" + date.getMilliseconds()).slice(-3),

        seconds: date.getSeconds(),
        secondsFull: ("00" + date.getSeconds()).slice(-2),

        minutes: date.getMinutes(),
        minutesFull: ("00" + date.getMinutes()).slice(-2),

        hours: date.getHours(),
        hoursFull: ("00" + date.getHours()).slice(-2),

        days: textLanguage.days[date.getDay()],
        daysNumber: date.getDate(),
        daysNumberIndice: date.getDate() + (date.getDate() <= 3 ? textLanguage.daysIndice[date.getDate()] : ''),
        daysFullNumber: ("00" + date.getDate()).slice(-2),
        daysFullNumberIndice: ("00" + date.getDate()).slice(-2) + (date.getDate() <= 3 ? textLanguage.daysIndice[date.getDate()] : ''),

        months: textLanguage.months[date.getMonth()],
        monthsNumber: date.getMonth() + 1,
        monthsFullNumber: ("00" + (date.getMonth() + 1)).slice(-2),

        years: (String(date.getFullYear())).slice(-2),
        yearsFull: date.getFullYear()

    }

    let format = options.format;

    if (typeof(format) != 'string') return obj;

    const regex = /mo|MMOO|MO|DD|D-|D|d-|d|MS|ms|S|s|M|m|H|h|Y|y/,
        separators = format.split(regex).slice(1);

    const dateByKey = {

        'MS': obj.millisecondsFull,
        'ms': obj.milliseconds,

        'Y': obj.yearsFull,
        'y': obj.years,

        'H': obj.hoursFull,
        'h': obj.hours,

        'M': obj.minutesFull,
        'm': obj.minutes,

        'S': obj.secondsFull,
        's': obj.seconds,

        'D': obj.daysFullNumber,
        'D-': obj.daysFullNumberIndice,
        'd': obj.daysNumber,
        'd-': obj.daysNumberIndice,

        'mo': obj.monthsNumber,
        'MO': obj.monthsFullNumber,

        'DD': obj.days,
        'MMOO': obj.months,

    }

    let timeKeys = [],
        values = [];

    for (let i = 0; i < separators.length; i ++) {
        const separator = separators[i],
            reg = new RegExp(`(${String(regex).substring(1, String(regex).length - 1)})` + separator.replace(/\(/, '\\(')),
            match = format.match(reg)?.[0];

        if (!match) continue;

        const keyVal = match.replace(separator, '').replace(/ /g, ''),
            value = (<any>dateByKey)[keyVal];

        format = format.replace(reg, '');

        timeKeys.push(match);
        values.push(value);

    }

    for (let i = 0; i < timeKeys.length; i ++) {
        const match: any = timeKeys[i].match(regex)?.[0];
        if (match) timeKeys[i] = timeKeys[i].replace(match, values[i]);
    }

    return timeKeys.join('');

}

module.exports = formatDate;