import { Fragment, Node, Slice, Schema } from 'prosemirror-model';
export declare function unwrapContentFromLayout(maybeLayoutSection: Node): Node | Node[];
export declare function removeLayoutFromFirstChild(node: Node, i: number): Node<any> | Node<any>[];
export declare function removeLayoutFromLastChild(node: Node, i: number, fragment: Fragment): Node<any> | Node<any>[];
/**
 * When we have a slice that cuts across a layoutSection/layoutColumn
 * we can end up with unexpected behaviour on paste/drop where a user
 * is able to add columns to a layoutSection. By 'lifting' any content
 * inside an 'open' layoutSection/layoutColumn to the top level, we
 * can ensure prevent this.
 *
 * We only care about slices with non-zero openStart / openEnd's here
 * as we're totally fine for people to copy/paste a full layoutSection
 */
export declare function transformSliceToRemoveOpenLayoutNodes(slice: Slice, schema: Schema): Slice<any>;
