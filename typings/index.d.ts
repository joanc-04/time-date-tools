export interface OptionsDateSettings {
    format?: string | "DD/MM/YYYY, HH:mm:ss.SSS";
    lang?: string | "en";
}

export interface OptionsTimeSettings {
    format?: string | "Y YYYY, M MMMM, W WWWW, D DDDD, h HH, m MM, s SS, sss SSSS";
    lang?: string | "en";
    precision?: boolean | "true";
    long?: boolean | "true";
}

/**
 *
 * @param time The time in milliseconds to convert into any format
 * @param options The options of the format returned
 */


export class TimeSettings {

    /**
     *
     * @param options The settings of the Time class.
     */
    constructor(options: OptionsTimeSettings);

    /**
     *
     * @param time The time in milliseconds to convert in string.
     */
    format(time: number): string;

    /**
     *
     * @param time The time in string to convert in milliseconds.
     */
    parse(time: string): number;
}

export class DateSettings {

    /**
     *
     * @param options The settings of the Date class.
     */
    constructor(options: OptionsDateSettings);

    /**
     *
     * @param date The date in milliseconds to convert in string.
     */
    format(date: number): string;
}