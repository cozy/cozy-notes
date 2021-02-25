import { Node as PMNode, NodeType, MarkType, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { Command } from '../types';
export declare function preventDefault(): Command;
export declare function insertNewLine(): Command;
export declare const insertNewLineWithAnalytics: Command;
export declare function insertRule(): Command;
export declare const createNewParagraphAbove: Command;
export declare const createNewParagraphBelow: Command;
export declare function createParagraphNear(append?: boolean): Command;
export declare function createParagraphAtEnd(): Command;
export declare const changeImageAlignment: (align?: "start" | "center" | "end" | undefined) => Command;
export declare const createToggleBlockMarkOnRange: <T = object>(markType: MarkType, getAttrs: (prevAttrs?: T | undefined, node?: PMNode<any> | undefined) => false | T | undefined, allowedBlocks?: NodeType<any>[] | ((schema: Schema, node: PMNode, parent: PMNode) => boolean) | undefined) => (from: number, to: number, tr: Transaction, state: EditorState) => boolean;
/**
 * Toggles block mark based on the return type of `getAttrs`.
 * This is similar to ProseMirror's `getAttrs` from `AttributeSpec`
 * return `false` to remove the mark.
 * return `undefined for no-op.
 * return an `object` to update the mark.
 */
export declare const toggleBlockMark: <T = object>(markType: MarkType, getAttrs: (prevAttrs?: T | undefined, node?: PMNode<any> | undefined) => false | T | undefined, allowedBlocks?: NodeType<any>[] | ((schema: Schema, node: PMNode, parent: PMNode) => boolean) | undefined) => Command;
export declare const clearEditorContent: Command;
