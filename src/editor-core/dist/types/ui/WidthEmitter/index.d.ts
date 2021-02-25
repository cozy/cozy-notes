import { EditorView } from 'prosemirror-view';
export interface Props {
    editorView: EditorView;
}
declare const WidthEmitter: ({ editorView }: Props) => JSX.Element;
export default WidthEmitter;
