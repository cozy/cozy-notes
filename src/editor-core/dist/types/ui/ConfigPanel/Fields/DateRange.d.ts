import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { DateRangeField } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
declare const _default: React.ComponentClass<{
    field: DateRangeField;
    onBlur: OnBlur;
    autoFocus?: boolean | undefined;
    placeholder?: string | undefined;
    parentName?: string | undefined;
}, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<{
        field: DateRangeField;
        onBlur: OnBlur;
        autoFocus?: boolean | undefined;
        placeholder?: string | undefined;
        parentName?: string | undefined;
    } & InjectedIntlProps>;
};
export default _default;
