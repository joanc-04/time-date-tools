var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var formatDate_exports = {};
__export(formatDate_exports, {
  formatDate: () => formatDate
});
module.exports = __toCommonJS(formatDate_exports);
var import_exports = require("../exports.js");
var import_message = __toESM(require("../../../res/errors/message.json"));
const formatDateOptionsDefault = {
  lang: "en",
  format: null
};
function formatDate(dateInMilliseconds, options) {
  if (!dateInMilliseconds)
    return import_exports.Console.error(import_message.default.ERROR_MISSING_ARGUMENT_TIME);
  for (let i of Object.entries(formatDateOptionsDefault))
    if (options?.[i[0]] == void 0)
      options[i[0]] = i[1];
  const date = new Date(dateInMilliseconds);
  if (!date)
    return import_exports.Console.error("Time is invalid");
  const textLanguage = import_exports.client.lang[options.lang || formatDateOptionsDefault.lang]?.dateKeys;
  const obj = {
    date,
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
    daysNumberIndice: date.getDate() + (date.getDate() <= 3 ? textLanguage.daysIndice[date.getDate()] : textLanguage.daysIndice[3]),
    daysFullNumber: ("00" + date.getDate()).slice(-2),
    daysFullNumberIndice: ("00" + date.getDate()).slice(-2) + (date.getDate() <= 3 ? textLanguage.daysIndice[date.getDate()] : textLanguage.daysIndice[3]),
    months: textLanguage.months[date.getMonth()],
    monthsNumber: date.getMonth() + 1,
    monthsFullNumber: ("00" + (date.getMonth() + 1)).slice(-2),
    years: String(date.getFullYear()).slice(-2),
    yearsFull: date.getFullYear()
  };
  let format = options.format;
  if (typeof format != "string")
    return obj;
  const regex = /mo|MMOO|MO|DD|D-|D|d-|d|MS|ms|S|s|M|m|H|h|Y|y/, separators = format.split(regex).slice(1);
  const dateByKey = {
    "MS": obj.millisecondsFull,
    "ms": obj.milliseconds,
    "Y": obj.yearsFull,
    "y": obj.years,
    "H": obj.hoursFull,
    "h": obj.hours,
    "M": obj.minutesFull,
    "m": obj.minutes,
    "S": obj.secondsFull,
    "s": obj.seconds,
    "D": obj.daysFullNumber,
    "D-": obj.daysFullNumberIndice,
    "d": obj.daysNumber,
    "d-": obj.daysNumberIndice,
    "mo": obj.monthsNumber,
    "MO": obj.monthsFullNumber,
    "DD": obj.days,
    "MMOO": obj.months
  };
  let timeKeys = [], values = [];
  for (let i = 0; i < separators.length; i++) {
    const separator = separators[i], reg = new RegExp(`(${String(regex).substring(1, String(regex).length - 1)})` + separator.replace(/\(/, "\\(")), match = format.match(reg)?.[0];
    if (!match)
      continue;
    const keyVal = match.replace(separator, "").replace(/ /g, ""), value = dateByKey[keyVal];
    format = format.replace(reg, "");
    timeKeys.push(match);
    values.push(value);
  }
  for (let i = 0; i < timeKeys.length; i++) {
    const match = timeKeys[i].match(regex)?.[0];
    if (match)
      timeKeys[i] = timeKeys[i].replace(match, values[i]);
  }
  return timeKeys.join("");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatDate
});
