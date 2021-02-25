/// <reference types="prosemirror-model" />
import type { EditorView } from 'prosemirror-view';
import type { Command } from '../types/command';
export declare function __temporaryFixForConfigPanel(editorView: EditorView): Promise<void>;
export declare function getEditorValueWithMedia(editorView: EditorView): Promise<import("prosemirror-model").Node<any>>;
/**
 * Iterates over the commands one after the other,
 * passes the tr through and dispatches the cumulated transaction
 */
export declare function cascadeCommands(cmds: Command[]): Command;
