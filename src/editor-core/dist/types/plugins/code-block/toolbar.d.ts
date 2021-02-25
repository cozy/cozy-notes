import { FloatingToolbarHandler } from '../floating-toolbar/types';
import { SelectOption } from '../floating-toolbar/ui/Select';
export declare const messages: {
    selectLanguage: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export declare const getToolbarConfig: (allowCopyToClipboard?: boolean) => FloatingToolbarHandler;
/**
 * Filters language list based on both name and alias properties.
 */
export declare const languageListFilter: (option: SelectOption, rawInput: string) => any;
