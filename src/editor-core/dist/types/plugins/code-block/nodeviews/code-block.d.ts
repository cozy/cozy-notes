import { EditorView } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
import { getPosHandlerNode, getPosHandler } from '../../../nodeviews/';
export declare class CodeBlockView {
    node: Node;
    dom: HTMLElement;
    contentDOM: HTMLElement;
    lineNumberGutter: HTMLElement;
    getPos: getPosHandlerNode;
    view: EditorView;
    constructor(node: Node, view: EditorView, getPos: getPosHandlerNode);
    private ensureLineNumbers;
    update(node: Node): boolean;
    ignoreMutation(record: MutationRecord | {
        type: 'selection';
        target: Element;
    }): boolean;
}
export declare const codeBlockNodeView: () => (node: Node, view: EditorView, getPos: getPosHandler) => CodeBlockView;
