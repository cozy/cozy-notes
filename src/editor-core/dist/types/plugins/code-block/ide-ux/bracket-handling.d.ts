export declare const BRACKET_MAP: {
    '{': string;
    '[': string;
    '(': string;
};
export declare type BracketMapKey = keyof typeof BRACKET_MAP;
export declare const shouldAutoCloseBracket: (before: string, after: string) => boolean;
export declare const getAutoClosingBracketInfo: (before: string, after: string) => {
    left: "{" | "[" | "(" | undefined;
    right: string | undefined;
    hasTrailingMatchingBracket: boolean;
};
