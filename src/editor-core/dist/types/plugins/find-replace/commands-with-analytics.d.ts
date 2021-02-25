import { EditorView } from 'prosemirror-view';
import { Command } from '../../types';
import { TRIGGER_METHOD } from '../analytics';
export declare const activateWithAnalytics: ({ triggerMethod, }: {
    triggerMethod: TRIGGER_METHOD.SHORTCUT | TRIGGER_METHOD.TOOLBAR;
}) => Command;
export declare const findWithAnalytics: ({ editorView, containerElement, keyword, }: {
    editorView: EditorView;
    containerElement: HTMLElement | null;
    keyword?: string | undefined;
}) => Command;
export declare const findNextWithAnalytics: ({ triggerMethod, }: {
    triggerMethod: TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.BUTTON;
}) => Command;
export declare const findPrevWithAnalytics: ({ triggerMethod, }: {
    triggerMethod: TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.BUTTON;
}) => Command;
export declare const replaceWithAnalytics: ({ triggerMethod, replaceText, }: {
    triggerMethod: TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.BUTTON;
    replaceText: string;
}) => Command;
export declare const replaceAllWithAnalytics: ({ replaceText, }: {
    replaceText: string;
}) => Command;
export declare const cancelSearchWithAnalytics: ({ triggerMethod, }: {
    triggerMethod: TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.TOOLBAR | TRIGGER_METHOD.BUTTON;
}) => Command;
