import { EnumRadioField } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
export default function RadioField({ field, onBlur, parentName, }: {
    field: EnumRadioField;
    onBlur: OnBlur;
    parentName?: string;
}): JSX.Element;
