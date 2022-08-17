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
var parseTime_exports = {};
__export(parseTime_exports, {
  parseTime: () => parseTime
});
module.exports = __toCommonJS(parseTime_exports);
var import_exports = require("../exports.js");
var import_message = __toESM(require("../../../res/errors/message.json"));
const timesInMilliseconds = [31556926e3, 26298e5, 6048e5, 864e5, 36e5, 6e4, 1e3, 1];
const parseTimeOptions = {
  msOff: false
};
function parseTime(mstime, options = parseTimeOptions) {
  const { client: client2 } = require("../../index.js");
  if (!mstime && typeof mstime != "string")
    return import_exports.Console.error(import_message.default.ERROR_MISSING_ARGUMENT_TIME);
  const splitTime = mstime.trim().toLowerCase().match(/\d+\s?[a-z]+/g);
  if (!splitTime?.[0])
    return 0;
  let times = 0;
  for (let i = 0; i < splitTime.length; i++) {
    if (!isNaN(splitTime[i]) && !splitTime[i].match(/\d/)?.[0]) {
      if (splitTime[i + 1])
        splitTime[i + 1] = splitTime[i] + splitTime[i + 1];
      splitTime.splice(i, 1);
    }
  }
  for (const element of splitTime) {
    const number = Number(element.match(/^\d+/g));
    if (isNaN(number))
      continue;
    const key = element.match(/[a-z]+/g)?.[0];
    let index;
    Object.values(client2.lang).find((e) => e.timeKeys.find((f, i) => {
      if (f.includes(key))
        index = i;
    }));
    if (index)
      times += timesInMilliseconds[index] * number;
  }
  return options.msOff ? times / 1e3 : times;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseTime
});
