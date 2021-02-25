import { Slice, Schema } from 'prosemirror-model';
export declare const LINK_REGEXP: RegExp;
export interface Match {
    schema: any;
    index: number;
    lastIndex: number;
    raw: string;
    text: string;
    url: string;
    length?: number;
    input?: string;
}
export declare function getLinkMatch(str: string): Match | LinkifyMatch | null;
/**
 * Instance of class LinkMatcher are used in autoformatting in place of Regex.
 * Hence it has been made similar to regex with an exec method.
 * Extending it directly from class Regex was introducing some issues, thus that has been avoided.
 */
export declare class LinkMatcher {
    exec(str: string): Match[] | null;
}
/**
 * Adds protocol to url if needed.
 */
export declare function normalizeUrl(url?: string | null): string;
export declare function linkifyContent(schema: Schema): (slice: Slice) => Slice;
export declare function getLinkDomain(url: string): string;
export declare function isFromCurrentDomain(url: string): boolean;
export interface LinkifyMatch {
    index: number;
    lastIndex: number;
    raw: string;
    url: string;
    text: string;
    schema: string;
}
export declare const linkifyMatch: (text: string) => LinkifyMatch[];
