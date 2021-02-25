import { PopupProps } from '@atlaskit/editor-common';
declare function getPopupOptions(type: 'column' | 'row', index: number, hasNumberedColumns: boolean, tableContainer: HTMLElement | null): Partial<PopupProps>;
export default getPopupOptions;
