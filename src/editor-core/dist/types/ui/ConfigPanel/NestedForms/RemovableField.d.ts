import React from 'react';
import { InjectedIntlProps } from 'react-intl';
declare type Props = {
    name: string;
    onClickRemove?: (fieldName: string) => void;
    canRemoveField?: boolean;
    children: React.ReactNode;
} & InjectedIntlProps;
declare const _default: React.ComponentClass<{
    name: string;
    onClickRemove?: ((fieldName: string) => void) | undefined;
    canRemoveField?: boolean | undefined;
    children: React.ReactNode;
}, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props>;
};
export default _default;
