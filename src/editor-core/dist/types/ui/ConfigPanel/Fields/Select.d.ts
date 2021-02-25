import { EnumSelectField } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
export default function SelectField({ field, onBlur, autoFocus, placeholder, parentName, }: {
    field: EnumSelectField;
    onBlur: OnBlur;
    autoFocus?: boolean;
    placeholder?: string;
    parentName?: string;
}): JSX.Element;
