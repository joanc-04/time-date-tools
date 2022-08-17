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
var formatTime_exports = {};
__export(formatTime_exports, {
  formatTime: () => formatTime
});
module.exports = __toCommonJS(formatTime_exports);
var import_exports = require("../exports.js");
var import_message = __toESM(require("../../../res/errors/message.json"));
const timesInMilliseconds = [31556926e3, 26298e5, 864e5, 36e5, 6e4, 1e3, 1];
const formatTimeOptionsDefault = {
  lang: "en",
  format: null
};
function formatTime(time, options) {
  if (!time)
    return import_exports.Console.error(import_message.default.ERROR_MISSING_ARGUMENT_TIME);
  time = Math.round(time);
  let splitTime = [];
  for (let i = 0; i < timesInMilliseconds.length; i++) {
    if (!timesInMilliseconds?.[i])
      splitTime.push(0);
    else {
      splitTime.push(Math.floor(time / timesInMilliseconds[i]));
      time -= splitTime[i] * timesInMilliseconds[i];
    }
  }
  for (let i of Object.entries(formatTimeOptionsDefault))
    if (options[i[0]] == void 0)
      options[i[0]] = i[1];
  const textLanguage = import_exports.client.lang[options.lang || formatTimeOptionsDefault.lang]?.timeKeys;
  const obj = {
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
    MMSS: textLanguage[7]
  };
  for (const i of Object.entries(obj).slice(0, 7))
    obj[i[0].toUpperCase()] = i[1] < 10 ? "0" + i[1] : `${i[1]}`;
  for (const i of Object.entries(obj).slice(7, 14)) {
    obj[i[0].toLowerCase()] = i[1][2];
    obj[i[0]] = i[0].length == 2 ? i[1][obj[i[0].toLowerCase()[0]] > 1 ? 1 : 0] : i[1][obj[i[0].toLowerCase().substring(1, i[0] == "YY" ? 2 : 3)] > 1 ? 1 : 0];
  }
  let format = options.format;
  if (typeof format != "string")
    return obj;
  else
    format = format.trim();
  const regex = /YY|MMOO|DD|HH|MMSS|MM|SS|yy|mmoo|dd|hh|mmss|mm|ss|Y|MO|D|H|MS|M|S|y|mo|d|h|ms|m|s/;
  let separators = format.split(regex), timeKeys = [], values = [], null_ = separators[0].includes("[");
  separators = separators.slice(1);
  for (let i = 0; i < separators.length; i++) {
    const separator = separators[i], reg = new RegExp(`(${String(regex).substring(1, String(regex).length - 1)})` + separator.replace(/\[/g, "\\[")), match = format.match(reg)?.[0];
    if (!match)
      continue;
    const keyVal = match.replace(separator, "").replace(/ /g, ""), value = obj[keyVal], isMany = (typeof value == "string" && obj[keyVal.toLowerCase().substring(1, keyVal.length == 2 ? 2 : keyVal.length == 4 && keyVal == "YY" ? 2 : 3)]) > 0 || value > 0 ? true : false;
    format = format.replace(reg, "");
    if (isMany || null_) {
      timeKeys.push(match);
      values.push(value);
    }
    if (separator.includes("["))
      null_ = true;
    if (separator.includes("]"))
      null_ = false;
  }
  for (let i = 0; i < timeKeys.length; i++) {
    const match = timeKeys[i].match(regex)?.[0];
    if (timeKeys.length - 1 == i)
      timeKeys[i] = match;
    if (match)
      timeKeys[i] = timeKeys[i].replace(match, values[i]);
  }
  return timeKeys.join("").replace(/^([^0-9]+)/, "").replace(/\[|\]/g, "");
}
;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatTime
});
