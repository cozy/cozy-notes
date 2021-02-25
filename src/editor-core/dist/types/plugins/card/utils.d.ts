import { EditorState } from 'prosemirror-state';
import { NodeType, Node, Slice } from 'prosemirror-model';
import { CardAppearance } from '@atlaskit/editor-common/provider-factory';
import { CardInfo } from './types';
export declare const appearanceForNodeType: (spec: NodeType) => CardAppearance | undefined;
export declare const selectedCardAppearance: (state: EditorState) => false | "embed" | "inline" | "block" | undefined;
export declare type TitleUrlPair = {
    title?: string;
    url?: string;
};
export declare const titleUrlPairFromNode: (node: Node) => TitleUrlPair;
/**
 * Merges the title and url from attributes and CardInfo from the resolved view, preferring the CardInfo.
 * @param titleUrlPair title and url information from the node attributes
 * @param info information stored in state from the resolved UI component view
 */
export declare const mergeCardInfo: (titleUrlPair: TitleUrlPair, info?: CardInfo | undefined) => TitleUrlPair;
export declare const displayInfoForCard: (node: Node, info?: CardInfo | undefined) => TitleUrlPair;
export declare const findCardInfo: (state: EditorState) => CardInfo | undefined;
export declare const transformUnsupportedBlockCardToInline: (slice: Slice, state: EditorState) => Slice;
