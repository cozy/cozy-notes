import { InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { FloatingToolbarConfig } from '../../plugins/floating-toolbar/types';
export declare const layoutToolbarTitle = "Layout floating controls";
export declare const buildToolbar: (state: EditorState, intl: InjectedIntl, pos: number, _allowBreakout: boolean, addSidebarLayouts: boolean) => FloatingToolbarConfig | undefined;
