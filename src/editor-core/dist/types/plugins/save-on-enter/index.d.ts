import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Dispatch } from '../../event-dispatcher';
import { EditorPlugin } from '../../types';
export declare function createPlugin(eventDispatch: Dispatch, onSave?: (editorView: EditorView) => void): Plugin | undefined;
declare const saveOnEnterPlugin: (onSave?: ((editorView: EditorView) => void) | undefined) => EditorPlugin;
export default saveOnEnterPlugin;
