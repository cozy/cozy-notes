import { AllowedBlockTypes } from '../../types/allowed-block-types';
import { MessageDescriptor } from '../../types/i18n';
import { NodeSpec } from 'prosemirror-model';
export declare const NORMAL_TEXT: BlockType;
export declare const HEADING_1: BlockType;
export declare const HEADING_2: BlockType;
export declare const HEADING_3: BlockType;
export declare const HEADING_4: BlockType;
export declare const HEADING_5: BlockType;
export declare const HEADING_6: BlockType;
export declare const BLOCK_QUOTE: BlockType;
export declare const CODE_BLOCK: BlockType;
export declare const PANEL: BlockType;
export declare const OTHER: BlockType;
export declare const TEXT_BLOCK_TYPES: BlockType[];
export declare const WRAPPER_BLOCK_TYPES: BlockType[];
export declare const ALL_BLOCK_TYPES: BlockType[];
export declare const HEADINGS_BY_LEVEL: Record<number, BlockType>;
export declare const HEADINGS_BY_NAME: {
    [blockType: string]: BlockType;
};
export declare type BlockTypeName = 'normal' | 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6' | 'blockquote' | 'codeblock' | 'panel' | 'notePanel' | 'successPanel' | 'warningPanel' | 'errorPanel' | 'other';
export interface BlockType {
    name: string;
    title: MessageDescriptor;
    nodeName: string;
    tagName?: string;
    level?: HeadingLevelsAndNormalText;
}
export declare type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;
export declare type NormalTextLevel = 0;
export declare type HeadingLevelsAndNormalText = HeadingLevels | NormalTextLevel;
export interface BlockTypeNode {
    name: AllowedBlockTypes;
    node: NodeSpec;
}
export interface BlockTypePluginOptions {
    lastNodeMustBeParagraph?: boolean;
    allowBlockType?: {
        exclude?: Array<AllowedBlockTypes>;
    };
}
