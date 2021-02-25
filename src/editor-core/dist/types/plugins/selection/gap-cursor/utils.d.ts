import { Node as PMNode, ResolvedPos, Schema } from 'prosemirror-model';
import { Side } from './selection';
export declare const isLeftCursor: (side: Side) => side is Side.LEFT;
export declare function getMediaNearPos(doc: PMNode, $pos: ResolvedPos, schema: Schema, dir?: number): PMNode | null;
export declare const isTextBlockNearPos: (doc: PMNode, schema: Schema, $pos: ResolvedPos, dir: number) => boolean;
export declare function getBreakoutModeFromTargetNode(node: PMNode): string;
export declare const isIgnoredClick: (elem: HTMLElement) => boolean;
