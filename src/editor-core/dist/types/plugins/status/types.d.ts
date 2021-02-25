import { Color as ColorType } from '@atlaskit/status/element';
export declare type StatusType = {
    color: ColorType;
    text: string;
    localId?: string;
};
export declare type StatusState = {
    isNew: boolean;
    showStatusPickerAt: number | null;
};
export interface StatusPluginOptions {
    menuDisabled: boolean;
    useInlineWrapper?: boolean;
    allowZeroWidthSpaceAfter?: boolean;
}
