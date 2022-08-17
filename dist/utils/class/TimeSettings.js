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
var TimeSettings_exports = {};
__export(TimeSettings_exports, {
  TimeSettings: () => TimeSettings
});
module.exports = __toCommonJS(TimeSettings_exports);
var import_exports = require("../exports.js");
const timesInMilliseconds = [31556926e3, 26298e5, 6048e5, 864e5, 36e5, 6e4, 1e3, 1];
class TimeSettings {
  #format;
  constructor(options) {
    this.#format = options?.format || "Y YYYY, M MMMM, W WWWW, D dddd, h HH, m MM, s SS, sss SSSS";
    this.lang = options?.lang || "en";
    this.precision = options?.precision != false | 0;
    this.long = options?.long != false | 0;
  }
  async parse(time) {
    const splitTime = time.toLowerCase().match(/\d+(\s+)?[a-zA-Z]+/g);
    if (!splitTime)
      return 0;
    let timeInMilliseconds = 0;
    for (let i of splitTime) {
      const value = Number(i.match(/\d+/));
      const key = String(i.match(/[a-z]+/));
      for (let lang of Object.values(import_exports.client.lang)) {
        const getKey = lang.timeKeys.find((f) => f.includes(key));
        const index = lang.timeKeys.indexOf(getKey);
        if (index != -1) {
          timeInMilliseconds += timesInMilliseconds[index] * value;
          break;
        }
      }
    }
    return timeInMilliseconds;
  }
  async format(time) {
    const textLanguage = import_exports.client.lang[this.lang]?.timeKeys;
    if (time == 0)
      return "0 " + textLanguage[7][0];
    else if (time < 0)
      return import_exports.Console.error("Please indicate a valid time");
    let tab = [], halfValues = [];
    for (let i of timesInMilliseconds) {
      const quo = Math.floor(time / i);
      tab.push(time / i >= 1 ? quo : 0);
      halfValues.push(Math.round(time / i));
      time -= quo * i;
    }
    let unities = ["YYYY", "MMMM", "WWWW", "DDDD", "HH", "MM", "SS", "SSSS", "yyyy", "mmmm", "wwww", "dddd", "hh", "mm", "ss", "ssss"];
    let values = ["Y", "M", "W", "D", "h", "m", "s", "sss"];
    const obj = {};
    for (let i in unities) {
      if (i < 8)
        obj[values[i]] = tab[i];
      obj[unities[i]] = textLanguage[i > 7 ? i - 8 : i][unities[i].toUpperCase() == unities[i] ? tab[i > 7 ? i - 8 : i] > 1 | 0 : 2];
    }
    if (!this.precision) {
      for (let i in halfValues) {
        const value = halfValues[i];
        if (value && value != 0) {
          const unity = textLanguage[i][this.long ? value > 1 | 0 : 2];
          return value + (this.long ? " " : "") + unity;
        }
      }
    }
    if (!this.#format)
      return import_exports.Console.error("Please indicate a format.");
    unities[6] = "SSSS";
    unities[7] = "SS";
    unities[14] = "ssss";
    unities[15] = "ss";
    (values = values.slice(0, -2)).push("sss", "s");
    const text = "YYYY|Y|yyyy|MMMM|MM|M|mmmm|mm|m|WWWW|W|wwww|DDDD|D|dddd|HH|hh|h|SSSS|SS|ssss|sss|ss|s";
    const separators = this.#format.split(new RegExp(text, "g"));
    const arraySeparators = [separators[0]], arrayTime = [];
    let write = false;
    for (let i = 0; i < separators.length; i++) {
      const separator = separators[i];
      const match = this.#format.match(new RegExp(text));
      if (!match)
        continue;
      this.#format = this.#format.replace(match[0], "");
      if (separator.includes("["))
        write = true;
      else if (separator.includes("]"))
        write = false;
      const index = (typeof obj[match[0] || ""] == "string" ? unities : values).indexOf(match[0]);
      if (write || obj[match[0]] && !!obj[values[index]]) {
        arrayTime.push(match[0]);
        if (arrayTime.length != 1)
          arraySeparators.push(separator);
      }
    }
    let formatReplaced = "";
    for (let i in arraySeparators)
      formatReplaced += arraySeparators[i] + (arrayTime[i] ? obj[arrayTime[i] || ""] : "");
    return formatReplaced.replace(/(\[|])/g, "") + separators[separators.length - 1];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TimeSettings
});
