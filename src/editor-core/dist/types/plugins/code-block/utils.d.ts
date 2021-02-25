import { Slice, Schema } from 'prosemirror-model';
import { EditorState, Selection } from 'prosemirror-state';
export declare function transformSliceToJoinAdjacentCodeBlocks(slice: Slice): Slice;
export declare const transformSingleLineCodeBlockToCodeMark: (slice: Slice, schema: Schema) => Slice<any>;
export declare const findCodeBlock: (state: EditorState, selection?: Selection<any> | null | undefined) => import("prosemirror-utils").ContentNodeWithPos | undefined;
