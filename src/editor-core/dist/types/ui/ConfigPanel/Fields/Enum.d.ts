import { EnumField } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
export default function Enum({ field, autoFocus, onBlur, parentName, }: {
    field: EnumField;
    autoFocus: boolean;
    onBlur: OnBlur;
    parentName?: string;
}): JSX.Element;
