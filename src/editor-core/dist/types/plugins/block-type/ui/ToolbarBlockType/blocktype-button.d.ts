import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { MessageDescriptor } from '../../../../types/i18n';
export interface BlockTypeButtonProps {
    isSmall?: boolean;
    isReducedSpacing?: boolean;
    selected: boolean;
    disabled: boolean;
    title: MessageDescriptor;
    onClick(e: React.MouseEvent): void;
    formatMessage: InjectedIntlProps['intl']['formatMessage'];
}
export declare const messages: {
    textStyles: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export declare const BlockTypeButton: React.StatelessComponent<BlockTypeButtonProps>;
