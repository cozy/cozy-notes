import { StringField } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
export default function String({ field, autoFocus, onBlur, placeholder, parentName, }: {
    field: StringField;
    autoFocus?: boolean;
    onBlur: OnBlur;
    placeholder?: string;
    parentName?: string;
}): JSX.Element;
