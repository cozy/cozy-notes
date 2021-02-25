import { PresetProvider } from './internal/context/preset-context';
import { EditorSharedConfig, EditorSharedConfigConsumer, useEditorSharedConfig } from './internal/context/shared-config';
import { EditorContent } from './internal/components/EditorContent';
import { EditorProps } from './internal/editor-props-type';
/**
 * Main Editor component. Use in combination with `EditorContent` and a `Preset`.
 * Internally it constructs `ProseMirror View` and mounts it to `EditorContent`.
 *
 * `EditorContent` can be wrapped to implement any layout/design requirements.
 *
 * ```js
 * <Preset>
 *   <Editor>
 *     <EditorContent/>
 *   </Editor>
 * </Preset>
 * ```
 */
declare function Editor(props: EditorProps): JSX.Element;
/**
 *
 * Public API Exports.
 *
 */
export { PresetProvider, Editor, EditorContent, EditorSharedConfigConsumer, useEditorSharedConfig, };
export type { EditorProps, EditorSharedConfig, };
