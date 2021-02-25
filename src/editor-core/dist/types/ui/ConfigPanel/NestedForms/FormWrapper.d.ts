import React from 'react';
import { ExtensionManifest } from '@atlaskit/editor-common';
import { FieldDefinition, Parameters } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
declare type Props = {
    label: string;
    parentName?: string;
    extensionManifest: ExtensionManifest;
    fields: FieldDefinition[];
    parameters?: Parameters;
    canRemoveFields?: boolean;
    onClickRemove?: (fieldName: string) => void;
    children?: React.ReactNode;
    onFieldBlur: OnBlur;
    firstVisibleFieldName?: string;
    showTitle?: boolean;
};
declare const FormWrapper: ({ label, fields, parentName, parameters, extensionManifest, canRemoveFields, onClickRemove, children, onFieldBlur, firstVisibleFieldName, showTitle, }: Props) => JSX.Element;
export default FormWrapper;
