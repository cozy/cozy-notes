import { BooleanField } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
export default function Boolean({ field, onBlur, parentName, }: {
    field: BooleanField;
    onBlur: OnBlur;
    parentName?: string;
}): JSX.Element;
