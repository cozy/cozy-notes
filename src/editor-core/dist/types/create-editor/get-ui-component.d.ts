/// <reference types="react" />
import { EditorAppearance, EditorAppearanceComponentProps } from '../types';
export default function getUiComponent(appearance: EditorAppearance): React.ComponentClass<EditorAppearanceComponentProps> | React.FunctionComponent<EditorAppearanceComponentProps>;
