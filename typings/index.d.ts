export interface formatTimeOptions {
    lang?: 'fr' | 'en';
    format?: string | undefined;
    valueNull?: boolean;
}

/**
 * 
 * @param time The time in milliseconds to convert into any format
 * @param options The options of the format returned
 */
export function formatTime(time: number, options?: formatTimeOptions): string;

export interface parseTimeOptions {
    msOff?: boolean;   
}

/**
 * 
 * @param time The time in string to convert in milliseconds or seconds
 * @param options The options of the time returned
 */
export function parseTime(time: string, options?: parseTimeOptions): number;