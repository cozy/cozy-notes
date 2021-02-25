import { Command } from '../../../types';
import { INPUT_METHOD } from '../../analytics';
export declare const FORMATTING_NODE_TYPES: string[];
export declare const FORMATTING_MARK_TYPES: string[];
export declare function clearFormattingWithAnalytics(inputMethod: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT): Command;
export declare function clearFormatting(inputMethod?: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT): Command;
