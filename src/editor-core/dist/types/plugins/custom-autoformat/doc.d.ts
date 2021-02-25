import { EditorView } from 'prosemirror-view';
import { CustomAutoformatState } from './types';
import { InputRuleHander } from './input-rules';
import { AutoformatHandler } from '@atlaskit/editor-common/provider-factory';
export declare const buildHandler: (_regex: string, handler: AutoformatHandler) => InputRuleHander;
export declare const completeReplacements: (view: EditorView, state: CustomAutoformatState) => void;
