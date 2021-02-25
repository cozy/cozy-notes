import { Command } from '../../../types';
import { INPUT_METHOD } from '../../analytics';
export declare const moveRight: () => Command;
export declare const moveLeft: () => Command;
export declare type InputMethodToolbar = INPUT_METHOD.TOOLBAR;
export declare type InputMethodBasic = InputMethodToolbar | INPUT_METHOD.SHORTCUT | INPUT_METHOD.FORMATTING;
export declare const toggleEm: () => Command;
export declare const toggleEmWithAnalytics: ({ inputMethod, }: {
    inputMethod: InputMethodBasic;
}) => Command;
export declare const toggleStrike: () => Command;
export declare const toggleStrikeWithAnalytics: ({ inputMethod, }: {
    inputMethod: InputMethodBasic;
}) => Command;
export declare const toggleStrong: () => Command;
export declare const toggleStrongWithAnalytics: ({ inputMethod, }: {
    inputMethod: InputMethodBasic;
}) => Command;
export declare const toggleUnderline: () => Command;
export declare const toggleUnderlineWithAnalytics: ({ inputMethod, }: {
    inputMethod: InputMethodBasic;
}) => Command;
export declare const toggleSuperscript: () => Command;
export declare const toggleSuperscriptWithAnalytics: ({ inputMethod, }: {
    inputMethod: InputMethodBasic;
}) => Command;
export declare const toggleSubscript: () => Command;
export declare const toggleSubscriptWithAnalytics: ({ inputMethod, }: {
    inputMethod: InputMethodBasic;
}) => Command;
export declare const toggleCode: () => Command;
export declare const toggleCodeWithAnalytics: ({ inputMethod, }: {
    inputMethod: InputMethodBasic;
}) => Command;
export declare const createInlineCodeFromTextInputWithAnalytics: (from: number, to: number, text: string) => Command;
