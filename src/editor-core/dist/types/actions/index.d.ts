import { Node } from 'prosemirror-model';
import { JSONDocNode } from '@atlaskit/editor-json-transformer';
import { EditorView } from 'prosemirror-view';
import { Transformer } from '@atlaskit/editor-common';
import { EventDispatcher } from '../event-dispatcher';
import { AnalyticsEventPayload } from '@atlaskit/analytics-next/AnalyticsEvent';
export declare type ContextUpdateHandler = (editorView: EditorView, eventDispatcher: EventDispatcher) => void;
export interface EditorActionsOptions<T> {
    focus(): boolean;
    blur(): boolean;
    clear(): boolean;
    getValue(): Promise<T | JSONDocNode | undefined>;
    replaceDocument(rawValue: any): boolean;
    replaceSelection(rawValue: Node | Object | string): boolean;
    appendText(text: string): boolean;
    isDocumentEmpty(): boolean;
}
export default class EditorActions<T = any> implements EditorActionsOptions<T> {
    private editorView?;
    private contentTransformer?;
    private contentEncode?;
    private eventDispatcher?;
    private listeners;
    static from<T>(view: EditorView, eventDispatcher: EventDispatcher, transformer?: Transformer<T>): EditorActions<T>;
    _privateGetEditorView(): EditorView | undefined;
    _privateGetEventDispatcher(): EventDispatcher | undefined;
    _privateRegisterEditor(editorView: EditorView, eventDispatcher: EventDispatcher, contentTransformer?: Transformer<T>): void;
    _privateUnregisterEditor(): void;
    _privateSubscribe(cb: ContextUpdateHandler): void;
    _privateUnsubscribe(cb: ContextUpdateHandler): void;
    focus(): boolean;
    blur(): boolean;
    clear(): boolean;
    __temporaryFixForConfigPanel(): Promise<void>;
    getValue(): Promise<JSONDocNode | T | undefined>;
    isDocumentEmpty(): boolean;
    replaceDocument(rawValue: any, shouldScrollToBottom?: boolean, shouldAddToHistory?: boolean): boolean;
    replaceSelection(rawValue: Node | Object | string, tryToReplace?: boolean): boolean;
    appendText(text: string): boolean;
    dispatchAnalyticsEvent: (payload: AnalyticsEventPayload) => void;
}
