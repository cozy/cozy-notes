import { Transformer } from '@atlaskit/editor-common';
import { EditorView } from 'prosemirror-view';
import { EventDispatcher } from '../event-dispatcher';
import { MenuItem } from '../ui/DropdownMenu/types';
import { ToolbarUIComponentFactory } from '../ui/Toolbar/types';
import { UIComponentFactory } from './ui-components';

export interface EditorInstance {
  editorView: EditorView;
  eventDispatcher: EventDispatcher;
  contentComponents: UIComponentFactory[];
  primaryToolbarComponents: ToolbarUIComponentFactory[];
  secondaryToolbarComponents: UIComponentFactory[];
  contentTransformer?: Transformer<string>;
  insertMenuItems?: MenuItem[];
}
