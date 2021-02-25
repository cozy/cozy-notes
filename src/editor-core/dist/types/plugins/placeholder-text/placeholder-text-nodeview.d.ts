import { NodeView, EditorView } from 'prosemirror-view';
import { Node as PmNode } from 'prosemirror-model';
import { getPosHandler } from '../../nodeviews';
declare type PmMutationRecord = MutationRecord | {
    type: 'selection';
    target: Element;
};
export declare class PlaceholderTextNodeView implements NodeView {
    private readonly node;
    private readonly view;
    private readonly getPos;
    readonly dom: Node;
    constructor(node: PmNode, view: EditorView, getPos: getPosHandler);
    ignoreMutation(record: PmMutationRecord): boolean;
}
export {};
