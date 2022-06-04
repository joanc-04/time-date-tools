const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
};

type ColorList = keyof typeof colors;

export class Console {

    static #twoValue(value: string | number, number: number = 2) {
        return (("0".repeat(number)) + String(value)).slice(number * -1);
    }

    static #time(color1: string, color2: string) {
        const date = new Date();
        return `${color1}[ ${color2}${this.#twoValue(date.getMonth() + 1)}${color1}/${color2}${this.#twoValue(date.getDate())}${color1}/${color2}${this.#twoValue(date.getFullYear())}${color1} | ${color2}${this.#twoValue(date.getHours())}${color1}:${color2}${this.#twoValue(date.getMinutes())}${color1}:${color2}${this.#twoValue(date.getSeconds())}${color1}.${color2}${this.#twoValue(date.getMilliseconds())}${color1} ]`
    }

    static #title(color1: string, color2: string, title: string) {
        return `${color1}[ ${color2}${colors.bright}${title.toUpperCase()}${colors.reset} ${color1}]${colors.FgWhite}`;
    }

    static error(...value: any) {
        console.log(this.#time(colors.FgYellow, colors.FgRed), this.#title(colors.FgYellow, colors.FgRed, " Error "), ...value);
    }

    static success(...value: any) {
        console.log(this.#time(colors.FgYellow, colors.FgGreen), this.#title(colors.FgYellow, colors.FgGreen, "Success"), ...value);
    }

    static system(title: string | undefined, ...value: any) {
        console.log(this.#time(colors.FgYellow, colors.FgCyan), title ? this.#title(colors.FgYellow, colors.FgCyan, title) : '', ...value);
    }

    static custom(color1: ColorList, color2: ColorList, title: string | undefined, ...value: any) {
        console.log(this.#time(colors[color1], colors[color2]), title ? this.#title(colors[color1], colors[color2], title) : '', ...value);
    }

}