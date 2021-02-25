import EditorActions from '../../../../../actions';
import { EditorSharedConfig } from '../../context/shared-config';
import { CreateEditorParams } from './create-editor';
export declare function useEditor(config: CreateEditorParams & {
    editorActions?: EditorActions;
}): [EditorSharedConfig | null, (ref: HTMLDivElement | null) => void];
/**
 * Handles editor component unmount
 */
export declare function useHandleEditorLifecycle(editorSharedConfig: EditorSharedConfig | null): void;
