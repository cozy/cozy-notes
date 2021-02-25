import React, { ReactElement } from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { EditorView } from 'prosemirror-view';
import { EditorAppearance, ReactComponents, ToolbarUIComponentFactory } from '../../../types';
import { CollabEditOptions } from '../../../plugins/collab-edit';
import { DispatchAnalyticsEvent } from '../../../plugins/analytics';
import { EventDispatcher } from '../../../event-dispatcher';
import { EditorActions } from '../../..';
export interface FullPageToolbarProps {
    appearance?: EditorAppearance;
    providerFactory: ProviderFactory;
    editorActions?: EditorActions;
    editorDOMElement: JSX.Element;
    editorView: EditorView;
    eventDispatcher: EventDispatcher;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
    primaryToolbarComponents?: ToolbarUIComponentFactory[];
    customPrimaryToolbarComponents?: ReactComponents;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    disabled: boolean;
    collabEdit?: CollabEditOptions;
    showKeyline: boolean;
    containerElement: HTMLElement | null;
    beforeIcon?: ReactElement;
}
export declare const FullPageToolbar: React.FunctionComponent<FullPageToolbarProps>;
