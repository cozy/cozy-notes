import { EditorState } from 'prosemirror-state';
import { InjectedIntl } from 'react-intl';
import { NodeType } from 'prosemirror-model';
import { FloatingToolbarItem } from '../../plugins/floating-toolbar/types';
import { Command } from '../../types';
declare const buildLayoutButtons: (state: EditorState, intl: InjectedIntl, nodeType: NodeType, allowResizing?: boolean | undefined, allowResizingInTables?: boolean | undefined) => FloatingToolbarItem<Command>[];
export default buildLayoutButtons;
