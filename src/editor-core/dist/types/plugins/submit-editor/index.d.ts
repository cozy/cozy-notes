import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Dispatch } from '../../event-dispatcher';
import { EditorPlugin, EditorProps } from '../../types';
export declare function createPlugin(eventDispatch: Dispatch, onSave?: (editorView: EditorView) => void): Plugin | undefined;
declare const submitEditorPlugin: (onSave?: EditorProps['onSave']) => EditorPlugin;
export default submitEditorPlugin;
