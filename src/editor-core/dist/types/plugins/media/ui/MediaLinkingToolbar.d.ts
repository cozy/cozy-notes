import React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { InjectedIntl, InjectedIntlProps } from 'react-intl';
import { RecentSearchInputTypes } from '../../../ui/LinkSearch/types';
export declare const mediaLinkToolbarMessages: {
    backLink: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export declare type Props = {
    intl: InjectedIntl;
    providerFactory: ProviderFactory;
    editing: boolean;
    onBack: (url: string, meta: {
        inputMethod?: RecentSearchInputTypes;
    }) => void;
    onUnlink: () => void;
    onCancel: () => void;
    onBlur: (href: string) => void;
    onSubmit: (href: string, meta: {
        inputMethod: RecentSearchInputTypes;
    }) => void;
    displayUrl?: string;
};
export declare class LinkAddToolbar extends React.PureComponent<Props & InjectedIntlProps> {
    state: {
        validationErrors: never[];
    };
    private handleSubmit;
    private handleOnBack;
    private handleCancel;
    private handleUnlink;
    private handleOnBlur;
    private getValidationErrors;
    private renderContainer;
    render(): JSX.Element;
}
export default LinkAddToolbar;
