import { Node, Fragment, Slice } from 'prosemirror-model';
/**
 * A helper to get the underlying array of a fragment.
 */
export declare function getFragmentBackingArray(fragment: Fragment): ReadonlyArray<Node>;
export declare function mapFragment(content: Fragment, callback: (node: Node, parent: Node | null, index: number) => Node | Node[] | Fragment | null, parent?: Node | null): Fragment<any>;
export declare function mapSlice(slice: Slice, callback: (node: Node, parent: Node | null, index: number) => Node | Node[] | Fragment | null): Slice;
export declare type FlatMapCallback = (node: Node, index: number, fragment: Fragment) => Node | Node[];
export declare function flatmap(fragment: Fragment, callback: FlatMapCallback): Fragment;
export declare type MapWithCallback<T> = (node: Node, index: number, fragment: Fragment) => T;
export declare function mapChildren<T>(node: Node | Fragment, callback: MapWithCallback<T>): Array<T>;
