import { EditorState, Transaction } from 'prosemirror-state';
import { CardPluginState, Request } from '../../types';
export declare const getPluginState: (editorState: EditorState) => CardPluginState | undefined;
export declare const getPluginStateWithUpdatedPos: (pluginState: CardPluginState, tr: Transaction) => {
    requests: {
        pos: number;
        url: string;
        appearance: import("@atlaskit/editor-common/provider-factory").CardAppearance;
        compareLinkText: boolean;
        source: import("../../../analytics").INPUT_METHOD.AUTO_DETECT | import("../../../analytics").INPUT_METHOD.CLIPBOARD | import("../../../analytics").INPUT_METHOD.FORMATTING | import("../../../analytics").INPUT_METHOD.MANUAL | import("../../../analytics").INPUT_METHOD.TYPEAHEAD;
        analyticsAction?: import("../../../analytics").ACTION | undefined;
        shouldReplaceLink?: boolean | undefined;
    }[];
    cards: {
        pos: number;
        title?: string | undefined;
        url?: string | undefined;
    }[];
    provider: import("@atlaskit/editor-common/provider-factory").CardProvider | null;
    showLinkingToolbar: boolean;
};
export declare const getNewRequests: (oldState: CardPluginState | undefined, currentState: CardPluginState) => Request[];
