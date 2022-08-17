var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Console_exports = {};
__export(Console_exports, {
  Console: () => Console
});
module.exports = __toCommonJS(Console_exports);
const colors = {
  reset: "\x1B[0m",
  bright: "\x1B[1m",
  dim: "\x1B[2m",
  underscore: "\x1B[4m",
  blink: "\x1B[5m",
  reverse: "\x1B[7m",
  hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};
class Console {
  static #twoValue(value, number = 2) {
    return ("0".repeat(number) + String(value)).slice(number * -1);
  }
  static #time(color1, color2) {
    const date = new Date();
    return `${color1}[ ${color2}${this.#twoValue(date.getMonth() + 1)}${color1}/${color2}${this.#twoValue(date.getDate())}${color1}/${color2}${this.#twoValue(date.getFullYear())}${color1} | ${color2}${this.#twoValue(date.getHours())}${color1}:${color2}${this.#twoValue(date.getMinutes())}${color1}:${color2}${this.#twoValue(date.getSeconds())}${color1}.${color2}${this.#twoValue(date.getMilliseconds())}${color1} ]`;
  }
  static #title(color1, color2, title) {
    return `${color1}[ ${color2}${colors.bright}${title.toUpperCase()}${colors.reset} ${color1}]${colors.FgWhite}`;
  }
  static error(...value) {
    console.log(this.#time(colors.FgYellow, colors.FgRed), this.#title(colors.FgYellow, colors.FgRed, " Error "), ...value);
  }
  static success(...value) {
    console.log(this.#time(colors.FgYellow, colors.FgGreen), this.#title(colors.FgYellow, colors.FgGreen, "Success"), ...value);
  }
  static system(title, ...value) {
    console.log(this.#time(colors.FgYellow, colors.FgCyan), title ? this.#title(colors.FgYellow, colors.FgCyan, title) : "", ...value);
  }
  static custom(color1, color2, title, ...value) {
    console.log(this.#time(colors[color1], colors[color2]), title ? this.#title(colors[color1], colors[color2], title) : "", ...value);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Console
});
