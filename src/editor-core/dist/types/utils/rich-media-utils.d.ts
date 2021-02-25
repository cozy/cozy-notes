import { SnapPointsProps } from './../plugins/media/ui/ResizableMediaSingle/types';
import { RichMediaAttributes, RichMediaLayout } from '@atlaskit/adf-schema';
import { EditorView } from 'prosemirror-view';
export declare const nonWrappedLayouts: RichMediaLayout[];
export declare const floatingLayouts: string[];
export declare const isRichMediaInsideOfBlockNode: (view: EditorView, pos: number | boolean) => boolean;
export declare const alignAttributes: (layout: RichMediaLayout, oldAttrs: RichMediaAttributes, gridSize: number | undefined, originalWidth: number, lineLength?: number | undefined) => RichMediaAttributes;
export declare function calculateSnapPoints({ $pos, akEditorWideLayoutWidth, allowBreakoutSnapPoints, containerWidth, gridSize, gridWidth, insideInlineLike, insideLayout, isVideoFile, lineLength, offsetLeft, wrappedLayout, }: SnapPointsProps): number[];
