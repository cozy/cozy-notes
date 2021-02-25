import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { CustomField, ExtensionManifest } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
declare type Props = {
    field: CustomField;
    extensionManifest: ExtensionManifest;
    onBlur: OnBlur;
    autoFocus?: boolean;
    placeholder?: string;
    parentName?: string;
} & InjectedIntlProps;
declare const _default: React.ComponentClass<{
    field: CustomField;
    extensionManifest: ExtensionManifest<import("@atlaskit/editor-common/extensions").Parameters>;
    onBlur: OnBlur;
    autoFocus?: boolean | undefined;
    placeholder?: string | undefined;
    parentName?: string | undefined;
}, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props>;
};
export default _default;
