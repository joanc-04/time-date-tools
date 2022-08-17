import fs from 'fs';

export class Client {

    lang: any = {};

    constructor() {
        this.#launch();
    }

    async #launch() {
        await this.#loadLanguageFiles();
    }

    async #loadLanguageFiles() {
        const files = fs.readdirSync(__dirname + '../../../../res/languages').filter(e => e.endsWith('.json'));
        for (const file of files) {
            if (!this.lang[file.replace(/.json/, '')]) this.lang[file.replace(/.json/, '')] = {};
            this.lang[file.replace(/.json/, '')] = require(`../../../res/languages/${file}`);
        }
    }

}