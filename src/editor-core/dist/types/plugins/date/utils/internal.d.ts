import { DateType } from '../types';
import { DateSegment } from '../types';
export declare function padToTwo(number: number): string;
/**
 * Inconclusively check if a date string is valid - a value of false means it is definitely
 * invalid, a value of true means it might be valid.
 * @param date Date string to be parsed
 */
export declare function isDatePossiblyValid(date: string): boolean;
/**
 * Find the segment of a date a position refers to. Eg: pos 2 in 29/03/2020 is in
 * the day segment.
 * @param position Cursor position, with 0 referring to the left of the first char
 * @param date The localised date string
 * @param locale The language to interpret the date string in
 */
export declare function findDateSegmentByPosition(position: number, date: string, locale: string): DateSegment | undefined;
/**
 * Generate a placeholder date string for a given locale
 * eg: locale 'hu-HU' -> 'yyyy. mm. dd.'
 * @param locale A locale string supported by Intl.DateTimeFormat
 * @returns A placeholder string. d=1 or 2 digit day, dd=zero padded
 * day, same for month but letter m, yyyy=year
 */
export declare function getLocaleDatePlaceholder(locale: string): string | undefined;
/**
 * Adjust date segment up or down. Eg. If day is the active segment and adjustment is -1,
 * reduce the day by one.
 * @param date Valid datetype
 * @param activeSegment which part of the date is selected/being adjusted
 * @param adjustment how many units the segment is being adjusted (can be pos or neg, usually 1 or -1)
 */
export declare function adjustDate(date: DateType, activeSegment: DateSegment, adjustment: number): DateType;
export declare function isToday(date: DateType | undefined): boolean;
