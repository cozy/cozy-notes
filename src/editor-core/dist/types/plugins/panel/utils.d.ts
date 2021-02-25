import { DOMOutputSpec } from 'prosemirror-model';
import { EditorState, Selection } from 'prosemirror-state';
import { PanelAttributes } from '@atlaskit/adf-schema';
export declare const findPanel: (state: EditorState, selection?: Selection<any> | null | undefined) => import("prosemirror-utils").ContentNodeWithPos | undefined;
export declare const panelAttrsToDom: (attrs: PanelAttributes, allowCustomPanel: boolean) => DOMOutputSpec;
