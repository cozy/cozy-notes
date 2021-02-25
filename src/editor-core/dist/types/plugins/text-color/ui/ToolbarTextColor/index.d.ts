import React from 'react';
import { EditorView } from 'prosemirror-view';
import { InjectedIntlProps } from 'react-intl';
import { DispatchAnalyticsEvent } from '../../../analytics';
import { TextColorPluginState } from '../../pm-plugins/main';
export declare const messages: {
    textColor: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    moreColors: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    lessColors: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface State {
    isOpen: boolean;
    isShowingMoreColors: boolean;
}
export interface Props {
    pluginState: TextColorPluginState;
    editorView: EditorView;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    isReducedSpacing?: boolean;
    showMoreColorsToggle?: boolean;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
    disabled?: boolean;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
