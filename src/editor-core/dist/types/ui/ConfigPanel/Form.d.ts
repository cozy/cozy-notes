import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { ExtensionManifest } from '@atlaskit/editor-common';
import { FieldDefinition, Parameters } from '@atlaskit/editor-common/extensions';
declare type Props = {
    extensionManifest: ExtensionManifest;
    fields: FieldDefinition[];
    parameters?: Parameters;
    autoSave?: boolean;
    autoSaveTrigger?: unknown;
    submitting?: boolean;
    onCancel: () => void;
    firstVisibleFieldName?: string;
} & InjectedIntlProps;
declare const _default: React.ComponentClass<{
    extensionManifest: ExtensionManifest<Parameters>;
    fields: FieldDefinition[];
    parameters?: Parameters | undefined;
    autoSave?: boolean | undefined;
    autoSaveTrigger?: unknown;
    submitting?: boolean | undefined;
    onCancel: () => void;
    firstVisibleFieldName?: string | undefined;
}, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props>;
};
export default _default;
