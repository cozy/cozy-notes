import React from 'react';
import PropTypes from 'prop-types';
import { EditorView } from 'prosemirror-view';
import { Transformer } from '@atlaskit/editor-common';
import { EventDispatcher, Dispatch } from '../../../../event-dispatcher';
import { EditorAppearanceComponentProps } from '../../../../types';
import { FireAnalyticsCallback } from '../../../../plugins/analytics';
import EditorActions from '../../../../actions';
import { EditorProps } from '../editor-props-type';
/**
 * Provides access to most commonly used configurations and instances of classes,
 * that most editor components rely on.
 */
export declare type EditorSharedConfig = {
    editorView: EditorView;
    eventDispatcher: EventDispatcher;
    dispatch: Dispatch;
    transformer?: Transformer<any>;
    dispatchAnalyticsEvent?: FireAnalyticsCallback;
    primaryToolbarComponents: EditorAppearanceComponentProps['primaryToolbarComponents'];
    contentComponents: EditorAppearanceComponentProps['contentComponents'];
    popupsMountPoint: EditorProps['popupsMountPoint'];
    popupsBoundariesElement: EditorProps['popupsBoundariesElement'];
    popupsScrollableElement: EditorProps['popupsScrollableElement'];
    providerFactory: EditorAppearanceComponentProps['providerFactory'];
    editorActions: EditorActions;
    onChange?: EditorProps['onChange'];
    onDestroy?: EditorProps['onDestroy'];
    onMount?: EditorProps['onMount'];
};
export declare class EditorSharedConfigProvider extends React.Component<{
    value: EditorSharedConfig | null;
}, any> {
    static childContextTypes: {
        editorSharedConfig: PropTypes.Requireable<any>;
    };
    getChildContext(): {
        editorSharedConfig: EditorSharedConfig | null;
    };
    render(): JSX.Element;
}
export declare class EditorSharedConfigConsumer extends React.Component<{
    children: (value: EditorSharedConfig | null) => React.ReactNode | null;
}> {
    static contextTypes: {
        editorSharedConfig: PropTypes.Requireable<any>;
    };
    render(): JSX.Element;
}
export declare const useEditorSharedConfig: () => EditorSharedConfig | null;
