import React from 'react';
import { InjectedIntlProps } from 'react-intl';
export interface Props {
    value: string;
    label: string;
    tabIndex?: number;
    isSelected?: boolean;
    onClick: (value: string) => void;
    borderColor: string;
    checkMarkColor?: string;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
