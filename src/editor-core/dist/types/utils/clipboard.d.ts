export declare function checkClipboardTypes(type: DOMStringList | ReadonlyArray<string>, item: string): boolean;
export declare function isPastedFile(rawEvent: Event): boolean;
export declare const copyToClipboard: (textToCopy: string) => Promise<void>;
