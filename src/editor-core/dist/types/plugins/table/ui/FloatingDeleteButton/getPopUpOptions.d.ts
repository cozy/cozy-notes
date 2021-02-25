import { PopupProps } from '@atlaskit/editor-common';
import { CellSelectionType } from './types';
interface GetPopupOptions {
    left: number;
    top: number;
    selectionType?: CellSelectionType;
    tableWrapper: HTMLElement | null;
}
export default function getPopupOptions({ left, top, selectionType, tableWrapper, }: GetPopupOptions): Partial<PopupProps>;
export {};
