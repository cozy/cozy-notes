import { EnumCheckboxField } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
export default function CheckboxGroup({ field, onBlur, parentName, }: {
    field: EnumCheckboxField;
    onBlur: OnBlur;
    parentName?: string;
}): JSX.Element;
