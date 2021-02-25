import { DecorationSet } from 'prosemirror-view';
import { EditorState, SelectionBookmark } from 'prosemirror-state';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { Dispatch, EventDispatcher } from '../../../event-dispatcher';
import { InlineCommentAnnotationProvider, AnnotationInfo } from '../types';
export declare enum ACTIONS {
    UPDATE_INLINE_COMMENT_STATE = 0,
    SET_INLINE_COMMENT_DRAFT_STATE = 1,
    INLINE_COMMENT_UPDATE_MOUSE_STATE = 2,
    INLINE_COMMENT_CLEAR_DIRTY_MARK = 3,
    ADD_INLINE_COMMENT = 4,
    INLINE_COMMENT_SET_VISIBLE = 5,
    CLOSE_COMPONENT = 6
}
export interface InlineCommentPluginOptions {
    dispatch: Dispatch;
    eventDispatcher: EventDispatcher;
    portalProviderAPI: PortalProviderAPI;
    provider: InlineCommentAnnotationProvider;
}
export interface InlineCommentMouseData {
    isSelecting: boolean;
}
export declare type InlineCommentMap = {
    [key: string]: boolean;
};
export declare type InlineCommentAction = {
    type: ACTIONS.UPDATE_INLINE_COMMENT_STATE;
    data: InlineCommentMap;
} | {
    type: ACTIONS.SET_INLINE_COMMENT_DRAFT_STATE;
    data: {
        drafting: boolean;
        editorState: EditorState;
    };
} | {
    type: ACTIONS.INLINE_COMMENT_UPDATE_MOUSE_STATE;
    data: {
        mouseData: InlineCommentMouseData;
    };
} | {
    type: ACTIONS.INLINE_COMMENT_CLEAR_DIRTY_MARK;
} | {
    type: ACTIONS.CLOSE_COMPONENT;
} | {
    type: ACTIONS.ADD_INLINE_COMMENT;
    data: {
        drafting: boolean;
        inlineComments: InlineCommentMap;
        editorState: EditorState;
        selectedAnnotations: AnnotationInfo[];
    };
} | {
    type: ACTIONS.INLINE_COMMENT_SET_VISIBLE;
    data: {
        isVisible: boolean;
    };
};
export declare type InlineCommentPluginState = {
    annotations: InlineCommentMap;
    selectedAnnotations: AnnotationInfo[];
    dirtyAnnotations?: boolean;
    mouseData: InlineCommentMouseData;
    draftDecorationSet?: DecorationSet;
    bookmark?: SelectionBookmark<any>;
    disallowOnWhitespace: boolean;
    isVisible: boolean;
};
