import { ExtensionManifest } from '@atlaskit/editor-common';
import { FieldDefinition, Parameters } from '@atlaskit/editor-common/extensions';
import { OnBlur } from './types';
declare type FormProps = {
    fields: FieldDefinition[];
    parentName?: string;
    parameters?: Parameters;
    extensionManifest: ExtensionManifest;
    canRemoveFields?: boolean;
    onClickRemove?: (fieldName: string) => void;
    onFieldBlur: OnBlur;
    firstVisibleFieldName?: string;
};
export default function FormContent({ fields, parentName, parameters, extensionManifest, canRemoveFields, onClickRemove, onFieldBlur, firstVisibleFieldName, }: FormProps): JSX.Element;
export {};
