import { EditorState, Transaction } from 'prosemirror-state';
import { INPUT_METHOD } from '../../analytics';
import { RESOLVE_METHOD } from '../../analytics/types/inline-comment-events';
declare const _default: {
    addAnnotationMark: (id: string) => (transaction: Transaction<any>, state: EditorState<any>) => Transaction<any>;
    addInlineComment: (id: string) => (transaction: Transaction<any>, state: EditorState<any>) => Transaction<any>;
    addOpenCloseAnalytics: (drafting: boolean, method?: INPUT_METHOD.SHORTCUT | INPUT_METHOD.TOOLBAR) => (transaction: Transaction<any>, state: EditorState<any>) => Transaction<any>;
    addInsertAnalytics: (transaction: Transaction<any>, state: EditorState<any>) => Transaction<any>;
    addResolveAnalytics: (method?: RESOLVE_METHOD | undefined) => (transaction: Transaction<any>, state: EditorState<any>) => Transaction<any>;
};
export default _default;
