import { InjectedIntl } from 'react-intl';
import { FloatingToolbarButton, FloatingToolbarCustom, FloatingToolbarConfig } from '../../floating-toolbar/types';
import { Command } from '../../../types';
import { MediaToolbarBaseConfig } from '../types';
import { EditorState } from 'prosemirror-state';
export declare const altTextButton: (intl: InjectedIntl, state: EditorState) => FloatingToolbarButton<Command>;
export declare const altTextEditComponent: (options?: AltTextToolbarOptions | undefined) => FloatingToolbarCustom;
export interface AltTextToolbarOptions {
    altTextValidator?: (value: string) => string[];
}
export declare const getAltTextToolbar: (toolbarBaseConfig: MediaToolbarBaseConfig, options?: AltTextToolbarOptions | undefined) => FloatingToolbarConfig;
