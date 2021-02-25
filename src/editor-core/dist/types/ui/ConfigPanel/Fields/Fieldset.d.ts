import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { ExtensionManifest } from '@atlaskit/editor-common';
import { Fieldset, Parameters } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
declare type Props = {
    extensionManifest: ExtensionManifest;
    field: Fieldset;
    parameters?: Parameters;
    onFieldBlur: OnBlur;
    firstVisibleFieldName?: string;
    error?: string;
} & InjectedIntlProps;
declare const _default: React.ComponentClass<{
    extensionManifest: ExtensionManifest<Parameters>;
    field: Fieldset;
    parameters?: Parameters | undefined;
    onFieldBlur: OnBlur;
    firstVisibleFieldName?: string | undefined;
    error?: string | undefined;
}, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props>;
};
export default _default;
