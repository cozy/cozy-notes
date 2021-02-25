import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
export declare const GUTTER_SIZE_IN_PX = 120;
export declare const GUTTER_SELECTOR = "#editor-scroll-gutter";
export declare type ScrollGutterPluginOptions = {
    /** Element the page uses for scrolling */
    getScrollElement?: (view: EditorView) => HTMLElement | null;
    /**
     * Whether to allow custom functionality to scroll to gutter element in
     * plugin's handleScrollToSelection function
     * Default is true
     */
    allowCustomScrollHandler?: boolean;
};
declare const _default: (pluginOptions?: ScrollGutterPluginOptions) => Plugin<any, any> | undefined;
export default _default;
