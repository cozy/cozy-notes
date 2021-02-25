import { NumberField } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
export default function Number({ field, autoFocus, onBlur, placeholder, parentName, }: {
    field: NumberField;
    autoFocus?: boolean;
    onBlur: OnBlur;
    placeholder?: string;
    parentName?: string;
}): JSX.Element;
