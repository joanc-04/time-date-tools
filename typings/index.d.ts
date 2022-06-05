interface formatTimeOptions {
    lang?: 'fr' | 'en';
    format?: string | undefined;
}

/**
 *
 * @param time The time in milliseconds to convert into any format
 * @param options The options of the format returned
 */
export function formatTime(time: number, options?: formatTimeOptions): string;




interface parseTimeOptions {
    msOff?: boolean;
}

/**
 *
 * @param time The time in string to convert in milliseconds or seconds
 * @param options The options of the time returned
 */
export function parseTime(time: string, options?: parseTimeOptions): number;




interface formatDateOptions {
    lang?: 'fr' | 'en';
    format?: string | undefined;
}

/**
 *
 * @param {*} dateInMilliseconds The date in milliseconds to convert into any format
 * @param {*} options The options of the format returned
 */
export function formatTime(dateInMilliseconds: number, options: formatDateOptions): string;