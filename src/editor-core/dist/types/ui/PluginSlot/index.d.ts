import React from 'react';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { EditorAppearance, UIComponentFactory } from '../../types';
import { EventDispatcher } from '../../event-dispatcher';
import EditorActions from '../../actions';
import { DispatchAnalyticsEvent } from '../../plugins/analytics';
export interface Props {
    items?: Array<UIComponentFactory>;
    editorView?: EditorView;
    editorActions?: EditorActions;
    eventDispatcher?: EventDispatcher;
    providerFactory: ProviderFactory;
    appearance?: EditorAppearance;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    containerElement: HTMLElement | null;
    disabled: boolean;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
    contentArea?: HTMLElement;
}
export default class PluginSlot extends React.Component<Props, any> {
    static displayName: string;
    transitionEvent: "transitionend" | undefined;
    shouldComponentUpdate(nextProps: Props): boolean;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    componentWillUnmount(): void;
    forceComponentUpdate: (event: TransitionEvent) => void;
    removeModeChangeListener: (contentArea?: HTMLElement | undefined) => void;
    addModeChangeListener: (contentArea?: HTMLElement | undefined) => void;
    render(): JSX.Element | null;
}
