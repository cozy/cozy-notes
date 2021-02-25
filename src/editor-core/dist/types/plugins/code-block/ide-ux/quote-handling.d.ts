export declare const QUOTE_MAP: {
    "'": string;
    '"': string;
    '`': string;
};
export declare type QuoteMapKey = keyof typeof QUOTE_MAP;
export declare const shouldAutoCloseQuote: (before: string, after: string) => boolean;
export declare const getAutoClosingQuoteInfo: (before: string, after: string) => {
    left: "\"" | "'" | "`" | undefined;
    right: string | undefined;
    hasTrailingMatchingQuote: boolean;
};
