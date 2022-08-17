import { Console, client, OptionsTimeSettings } from '../exports.js';

const timesInMilliseconds = [31556926000, 2629800000, 604800000, 86400000, 3600000, 60000, 1000, 1];

export class TimeSettings {

    #format;
    private lang;
    private precision;
    private long;

    constructor(options: OptionsTimeSettings) {
        this.#format = options?.format || "Y YYYY, M MMMM, W WWWW, D DDDD, h HH, m MM, s SS, sss SSSS";
        this.lang = options?.lang || "en";
        this.precision = <any>(options?.precision != false) | 0;
        this.long = <any>(options?.long != false) | 0;
    }

    async parse (time: string) {

        const splitTime = time.toLowerCase().match(/\d+(\s+)?[a-zA-Z]+/g);
        if (!splitTime) return 0;

        let timeInMilliseconds = 0;

        for (let i of splitTime) {
            const value = Number(i.match(/\d+/));
            const key = String(i.match(/[a-z]+/));

            for (let lang of Object.values(client.lang)) {
                const getKey = (<any>lang).timeKeys.find((f: any) => f.includes(key));
                const index = (<any>lang).timeKeys.indexOf(getKey);

                if (index != -1) {
                    timeInMilliseconds += timesInMilliseconds[index] * value;
                    break;
                }
            }
        }

        return timeInMilliseconds;

    }

    async format (time: number) {

        const textLanguage = client.lang[this.lang]?.timeKeys;

        if (time == 0) return "0 " + textLanguage[7][0];
        else if (time < 0) return Console.error("Please indicate a valid time");

        let tab = [],
            halfValues = [];

        for (let i of timesInMilliseconds) {
            const quo = Math.floor(time / i);
            tab.push(time / i >= 1 ? quo : 0);
            halfValues.push(Math.round(time / i));
            time -= quo * i;
        }

        let unities = ["YYYY", "MMMM", "WWWW", "DDDD", "HH", "MM", "SS", "SSSS", "yyyy", "mmmm", "wwww", "dddd", "hh", "mm", "ss", "ssss"];
        let values = ["Y", "M", "W", "D", "h", "m", "s", "sss"];

        const obj = {}

        for (let i in unities) {
            if (<any>i < 8) (<any>obj)[values[i]] = tab[i];
            (<any>obj)[unities[i]] = textLanguage[<any>i > 7 ? <any>i - 8 : i][unities[i].toUpperCase() == unities[i] ? <any>((<any>tab)[<any>i > 7 ? <any>i - 8 : i] > 1) | 0 : 2];
        }

        if (!this.precision) {
            for (let i in halfValues) {
                const value: any = halfValues[i];
                if (value && value != 0) {
                    const unity = textLanguage[i][this.long ? <any>(value > 1) | 0 : 2];
                    return value + (this.long ? ' ' : '') + unity;
                }
            }
        }

        if (!this.#format) return Console.error("Please indicate a format.");

        unities[6] = "SSSS"; unities[7] = "SS"; unities[14] = "ssss"; unities[15] = "ss";
        (values = values.slice(0, -2)).push("sss", "s");

        const text = "YYYY|Y|yyyy|MMMM|MM|M|mmmm|mm|m|WWWW|W|wwww|DDDD|D|dddd|HH|hh|h|SSSS|SS|ssss|sss|ss|s";

        const separators = this.#format.split(new RegExp(text, "g"));
        const arraySeparators = [separators[0]], arrayTime = [];

        let write = false;

        for (let i = 0; i < separators.length; i ++) {
            const separator = separators[i];
            const match: any = this.#format.match(new RegExp(text));
            if (!match) continue;

            this.#format = this.#format.replace(match[0], "");

            if (separator.includes('[')) write = true;
            else if (separator.includes(']')) write = false;

            const index = ((typeof (<any>obj)[match[0] || ""] == "string") ? unities : values).indexOf(match[0]);

            if (write || ((<any>obj)[match[0]] && (!!((<any>obj)[values[index]])) || (!!((<any>obj)[unities[index]])))) {
                arrayTime.push(match[0]);
                if (arrayTime.length != 1) arraySeparators.push(separator);
            }

        }

        let formatReplaced = "";

        for (let i in arraySeparators) formatReplaced += arraySeparators[i] + (arrayTime[i] ? (<any>obj)[arrayTime[i] || ''] : "");

        return formatReplaced.replace(/(\[|])/g, '') + separators[separators.length - 1];

    }

}