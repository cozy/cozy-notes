import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
import { ProviderFactory } from '@atlaskit/editor-common';
import { DispatchAnalyticsEvent } from '../../analytics';
import { FloatingToolbarItem } from '../types';
export declare type Item = FloatingToolbarItem<Function>;
export interface Props {
    items: Array<Item>;
    dispatchCommand: (command?: Function) => void;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    providerFactory?: ProviderFactory;
    className?: string;
    focusEditor?: () => void;
    editorView?: EditorView;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
    target?: HTMLElement;
    node: Node;
}
export declare const isSameItem: (leftItem: Item, rightItem: Item) => boolean;
export declare const areSameItems: (leftArr?: FloatingToolbarItem<Function>[] | undefined, rightArr?: FloatingToolbarItem<Function>[] | undefined) => boolean;
export default class Toolbar extends Component<Props> {
    render(): JSX.Element | null;
    shouldComponentUpdate(nextProps: Props): boolean;
}
