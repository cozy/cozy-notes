import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EventDispatcher } from '../../../../event-dispatcher';
export interface Props {
    editorView: EditorView;
    pluginKey: PluginKey;
    eventDispatcher: EventDispatcher;
    isDisabled?: boolean;
    isReducedSpacing?: boolean;
}
declare const ToolbarMedia: ({ editorView, eventDispatcher, pluginKey, isDisabled, isReducedSpacing, }: Props) => JSX.Element;
export default ToolbarMedia;
