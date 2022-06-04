"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Client_instances, _Client_launch, _Client_loadLanguageFiles;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const fs_1 = require("fs");
class Client {
    constructor() {
        _Client_instances.add(this);
        this.lang = {};
        __classPrivateFieldGet(this, _Client_instances, "m", _Client_launch).call(this);
    }
}
exports.Client = Client;
_Client_instances = new WeakSet(), _Client_launch = async function _Client_launch() {
    await __classPrivateFieldGet(this, _Client_instances, "m", _Client_loadLanguageFiles).call(this);
}, _Client_loadLanguageFiles = async function _Client_loadLanguageFiles() {
    const files = (0, fs_1.readdirSync)('./src/utils/res/languages/').filter(e => e.endsWith('.json'));
    for (const file of files) {
        if (!this.lang[file.replace(/.json/, '')])
            this.lang[file.replace(/.json/, '')] = {};
        this.lang[file.replace(/.json/, '')] = require(`../res/languages/${file}`);
    }
};
