"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Console_twoValue, _Console_time, _Console_title;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
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
class Console {
    static error(...value) {
        console.log(__classPrivateFieldGet(this, _a, "m", _Console_time).call(this, colors.FgYellow, colors.FgRed), __classPrivateFieldGet(this, _a, "m", _Console_title).call(this, colors.FgYellow, colors.FgRed, " Error "), ...value);
    }
    static success(...value) {
        console.log(__classPrivateFieldGet(this, _a, "m", _Console_time).call(this, colors.FgYellow, colors.FgGreen), __classPrivateFieldGet(this, _a, "m", _Console_title).call(this, colors.FgYellow, colors.FgGreen, "Success"), ...value);
    }
    static system(title, ...value) {
        console.log(__classPrivateFieldGet(this, _a, "m", _Console_time).call(this, colors.FgYellow, colors.FgCyan), title ? __classPrivateFieldGet(this, _a, "m", _Console_title).call(this, colors.FgYellow, colors.FgCyan, title) : '', ...value);
    }
    static custom(color1, color2, title, ...value) {
        console.log(__classPrivateFieldGet(this, _a, "m", _Console_time).call(this, colors[color1], colors[color2]), title ? __classPrivateFieldGet(this, _a, "m", _Console_title).call(this, colors[color1], colors[color2], title) : '', ...value);
    }
}
exports.Console = Console;
_a = Console, _Console_twoValue = function _Console_twoValue(value, number = 2) {
    return (("0".repeat(number)) + String(value)).slice(number * -1);
}, _Console_time = function _Console_time(color1, color2) {
    const date = new Date();
    return `${color1}[ ${color2}${__classPrivateFieldGet(this, _a, "m", _Console_twoValue).call(this, date.getMonth() + 1)}${color1}/${color2}${__classPrivateFieldGet(this, _a, "m", _Console_twoValue).call(this, date.getDate())}${color1}/${color2}${__classPrivateFieldGet(this, _a, "m", _Console_twoValue).call(this, date.getFullYear())}${color1} | ${color2}${__classPrivateFieldGet(this, _a, "m", _Console_twoValue).call(this, date.getHours())}${color1}:${color2}${__classPrivateFieldGet(this, _a, "m", _Console_twoValue).call(this, date.getMinutes())}${color1}:${color2}${__classPrivateFieldGet(this, _a, "m", _Console_twoValue).call(this, date.getSeconds())}${color1}.${color2}${__classPrivateFieldGet(this, _a, "m", _Console_twoValue).call(this, date.getMilliseconds())}${color1} ]`;
}, _Console_title = function _Console_title(color1, color2, title) {
    return `${color1}[ ${color2}${colors.bright}${title.toUpperCase()}${colors.reset} ${color1}]${colors.FgWhite}`;
};
