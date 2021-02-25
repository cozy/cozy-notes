import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { EventDispatcher } from '../../../event-dispatcher';
import { CollabInviteToEditProps } from '../types';
export declare type AvatarsWithPluginStateProps = {
    editorView?: EditorView;
    eventDispatcher?: EventDispatcher;
} & CollabInviteToEditProps;
declare const _default: React.ComponentClass<AvatarsWithPluginStateProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<{
        editorView?: EditorView<any> | undefined;
        eventDispatcher?: EventDispatcher<any> | undefined;
    } & CollabInviteToEditProps & InjectedIntlProps>;
};
export default _default;
