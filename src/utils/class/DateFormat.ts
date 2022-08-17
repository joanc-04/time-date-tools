import { Console, client, OptionsDateSettings } from '../exports.js';

export class DateSettings {

    #format;
    private lang;

    constructor(options: OptionsDateSettings) {
        this.#format = options.format || "DD/MM/YYYY, HH:mm:ss.SSS";
        this.lang = options.lang || "en";
    }

    async format (date_: number) {

        const date = new Date(date_);
        if (!date) return Console.error('Time is invalid');

        const textLanguage = client.lang[this.lang]?.dateKeys;

        const numberYears = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1, 0];
        const numberYearsRoman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I", "N"];

        let dateYears = date.getFullYear();

        let romansText = "";
        for (let i = 0; i < numberYears.length; i++) {
            const quo = Math.floor(dateYears / numberYears[i]);
            romansText += numberYearsRoman[i].repeat(quo);
            dateYears -= (numberYears[i] * quo);
        }

        const obj = {

            S: ("000" + date.getMilliseconds()).slice(-3),
            SS: ("00" + date.getMilliseconds()).slice(-2),
            SSS: date.getMilliseconds(),

            s: date.getSeconds(),
            ss: ("00" + date.getSeconds()).slice(-2),

            m: date.getMinutes(),
            mm: ("00" + date.getMinutes()).slice(-2),

            H: date.getHours(),
            HH: ("00" + date.getHours()).slice(-2),
            h: date.getHours() - (date.getHours() > 12 ? 12 : 0),
            hh: ("00" + (date.getHours() - (date.getHours() > 12 ? 12 : 0))).slice(-2),


            dddd: textLanguage.days[date.getDay()],
            ddd: textLanguage.days[date.getDay()].slice(0, 3),
            dd: textLanguage.days[date.getDay()].slice(0, 2),
            DDD: date.getDate() + textLanguage.daysIndice[date.getDate() < 4 ? date.getDate() - 1 : 3],
            DD: ("00" + date.getDate()).slice(-2),
            D: date.getDate(),

            MMMM: textLanguage.months[date.getMonth()],
            MMM: textLanguage.months[date.getMonth()].slice(0, 3),
            MM: ("00" + (date.getMonth() + 1)).slice(-2),
            M: date.getMonth() + 1,

            YY: ("00" + date.getFullYear()).slice(-2),
            YYYY: date.getFullYear(),

            AA: ["A.M.", "P.M."][<any>(date.getHours() > 11) | 0],
            A: ["AM", "PM"][<any>(date.getHours() > 11) | 0],
            aa: ["a.m.", "p.m."][<any>(date.getHours() > 11) | 0],
            a: ["am", "pm"][<any>(date.getHours() > 11) | 0],

            R: romansText

        }

        const reg = new RegExp(/\[.+?]|\[.+/, "g");
        const splitFormat = this.#format.split(reg);
        const matchFormat = this.#format.match(reg);

        let text = "";
        const arr = ["YYYY", "YY", "HH", "H", "hh", "h", "mm", "m", "ss", "s", "SSS", "SS", "S", "DDD", "DD", "D", "MMMM", "MMM", "MM", "M", "R", "AA", "A", "aa", "a", "dddd", "ddd", "dd" ];
        for (let i in splitFormat) {
            let key = (<any>splitFormat)[i];

            if (key.length != 0) {
                for (let j of arr) {
                    const reg = new RegExp(j + '(?!])', "g");
                    key = key.replace(reg, typeof ((<any>obj)[j]) == 'string' ? ((<any>obj)[j]).split('').join(']') : ((<any>obj)[j]));
                }
                text += key;
            }

            if (matchFormat) {
                const separator = (<any>matchFormat)[i];
                if (separator) text += separator;
            }
        }

        return text.replace(/\[|]/g, '');

    }

}