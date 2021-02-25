import { EditorState, Selection } from 'prosemirror-state';
import { Slice, Schema } from 'prosemirror-model';
export declare const findExpand: (state: EditorState, selection?: Selection<any> | null | undefined) => import("prosemirror-utils").ContentNodeWithPos | undefined;
export declare const transformSliceToRemoveOpenExpand: (slice: Slice, schema: Schema) => Slice;
export declare const transformSliceNestedExpandToExpand: (slice: Slice, schema: Schema) => Slice;
