import React from 'react';
import { InjectedIntlProps } from 'react-intl';
declare type Props = {
    errorMessage: string;
} & InjectedIntlProps;
declare const _default: React.ComponentClass<{
    errorMessage: string;
}, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props>;
};
export default _default;
