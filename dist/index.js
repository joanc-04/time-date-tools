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
var src_exports = {};
__export(src_exports, {
  DateSettings: () => import_DateFormat.DateSettings,
  TimeSettings: () => import_TimeSettings.TimeSettings,
  client: () => client
});
module.exports = __toCommonJS(src_exports);
var import_exports = require("./utils/exports.js");
var import_DateFormat = require("./utils/class/DateFormat");
var import_TimeSettings = require("./utils/class/TimeSettings");
const client = new import_exports.Client();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateSettings,
  TimeSettings,
  client
});
