import { EditorPlugin } from '../../types';
import { CardOptions } from '../card';
export declare type PastePluginOptions = {
    cardOptions?: CardOptions;
    sanitizePrivateContent?: boolean;
    predictableLists?: boolean;
};
declare const pastePlugin: ({ cardOptions, sanitizePrivateContent, predictableLists, }: PastePluginOptions) => EditorPlugin;
export default pastePlugin;
