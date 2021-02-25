import { UserField, ExtensionManifest } from '@atlaskit/editor-common/extensions';
import { OnBlur } from '../types';
declare type Props = {
    field: UserField;
    extensionManifest: ExtensionManifest;
    onBlur: OnBlur;
    autoFocus?: boolean;
};
export default function UserSelect({ autoFocus, extensionManifest, field, onBlur, }: Props): JSX.Element;
export {};
