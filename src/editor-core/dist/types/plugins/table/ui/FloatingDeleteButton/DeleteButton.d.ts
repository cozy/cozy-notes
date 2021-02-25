import React, { SyntheticEvent } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { MessageDescriptor } from '../../../../types/i18n';
export interface ButtonProps {
    removeLabel: MessageDescriptor;
    style?: object;
    onClick?: (event: SyntheticEvent) => void;
    onMouseEnter?: (event: SyntheticEvent) => void;
    onMouseLeave?: (event: SyntheticEvent) => void;
}
declare const _default: React.ComponentClass<ButtonProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<ButtonProps & InjectedIntlProps>;
};
export default _default;
