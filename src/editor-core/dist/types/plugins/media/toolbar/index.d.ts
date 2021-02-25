import { InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { FloatingToolbarConfig } from '../../../plugins/floating-toolbar/types';
import { MediaFloatingToolbarOptions } from '../types';
export declare const floatingToolbar: (state: EditorState, intl: InjectedIntl, options?: MediaFloatingToolbarOptions) => FloatingToolbarConfig | undefined;
