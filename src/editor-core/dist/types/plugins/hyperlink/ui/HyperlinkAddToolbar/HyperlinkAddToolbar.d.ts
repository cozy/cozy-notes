import React from 'react';
import { ActivityProvider } from '@atlaskit/activity-provider';
import { SearchProvider } from '@atlaskit/editor-common';
import { PureComponent } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import { LinkSearchListItemData } from '../../../../ui/LinkSearch/types';
import { HyperlinkState } from '../../pm-plugins/main';
import { EditorView } from 'prosemirror-view';
import { LinkInputType } from '../../types';
export declare const RECENT_SEARCH_LIST_SIZE = 5;
export declare const messages: {
    displayText: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    clearText: {
        id: string;
        defaultMessage: string;
        description: string;
    };
    clearLink: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
interface BaseProps {
    onBlur?: (type: string, url: string, title: string | undefined, displayText: string | undefined, isTabPressed?: boolean) => void;
    onSubmit?: (href: string, title: string | undefined, displayText: string | undefined, inputMethod: LinkInputType) => void;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    autoFocus?: boolean;
    activityProvider?: Promise<ActivityProvider>;
    searchProvider?: Promise<SearchProvider>;
    displayUrl?: string;
    pluginState: HyperlinkState;
    view: EditorView;
}
interface DefaultProps {
    displayText: string;
}
export declare type Props = InjectedIntlProps & BaseProps & DefaultProps & WithAnalyticsEventsProps;
export interface State {
    activityProvider?: ActivityProvider;
    searchProvider?: SearchProvider;
    items: LinkSearchListItemData[];
    selectedIndex: number;
    displayUrl: string;
    isLoading: boolean;
    displayText: string;
}
export declare class HyperlinkLinkAddToolbar extends PureComponent<Props, State> {
    private isTabPressed;
    private submitted;
    private urlInputContainer;
    private displayTextInputContainer;
    private urlBlur;
    private textBlur;
    private handleClearText;
    private handleClearDisplayText;
    private debouncedQuickSearch;
    private fireCustomAnalytics?;
    private quickSearchQueryVersion;
    private analyticSource;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    private getRecentItems;
    private fireAnalytics;
    private loadInitialLinkSearchResult;
    private quickSearch;
    private updateInput;
    private createClearHandler;
    render(): JSX.Element;
    private handleSelected;
    private handleInsert;
    private handleMouseMove;
    private handleSubmit;
    private handleKeyDown;
    private handleTextKeyDown;
    private handleCancel;
    private handleBlur;
}
export declare const HyperlinkLinkAddToolbarWithIntl: React.ComponentClass<BaseProps & Partial<DefaultProps> & WithAnalyticsEventsProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<BaseProps & Partial<DefaultProps> & WithAnalyticsEventsProps & InjectedIntlProps>;
};
declare const _default: React.ForwardRefExoticComponent<Pick<BaseProps & Partial<DefaultProps> & WithAnalyticsEventsProps, "view" | "autoFocus" | "onBlur" | "onSubmit" | "searchProvider" | "activityProvider" | "popupsMountPoint" | "popupsBoundariesElement" | "pluginState" | "displayUrl" | "displayText"> & React.RefAttributes<any>>;
export default _default;
