import { DateType } from '../types';
/**
 * Attempt to parse a string representing a date in a particular locale to a date object
 * @param dateString The string representing the date in the given locale, eg '02/12/2000'
 * @param l10n The localisation provider created by createLocalizationProvider
 * @returns DateType when can parse, null when can't parse or invalid
 */
export declare function parseDateType(dateString: string, locale: string): DateType | null;
/**
 * Convert a date object to a string formatted for a particular locale
 * @param date The date object
 * @param locale The locale code string (eg. "en-AU")
 */
export declare function formatDateType(date: DateType, locale: string): string;
export declare function dateTypeToDate(date: DateType): Date;
export declare function dateToDateType(date: Date): DateType;
