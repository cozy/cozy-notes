import { MenuItem } from '../../../../ui/DropdownMenu/types';
export interface CreateInit {
    content: string;
    disabled: boolean;
    tooltipDescription?: string;
}
export declare const action: (init: CreateInit) => MenuItem;
export declare const link: (init: CreateInit) => MenuItem;
export declare const media: (init: CreateInit) => MenuItem;
export declare const imageUpload: (init: CreateInit) => MenuItem;
export declare const mention: (init: CreateInit) => MenuItem;
export declare const emoji: (init: CreateInit) => MenuItem;
export declare const table: (init: CreateInit) => MenuItem;
export declare const layout: (init: CreateInit) => MenuItem;
export declare const codeblock: (init: CreateInit & {
    shortcut?: string;
}) => MenuItem;
export declare const panel: (init: CreateInit & {
    shortcut?: string;
}) => MenuItem;
export declare const blockquote: (init: CreateInit & {
    shortcut?: string;
}) => MenuItem;
export declare const decision: (init: CreateInit) => MenuItem;
export declare const horizontalrule: (init: CreateInit) => MenuItem;
export declare const expand: (init: CreateInit) => MenuItem;
export declare const date: (init: CreateInit) => MenuItem;
export declare const placeholder: (init: CreateInit) => MenuItem;
export declare const status: (init: CreateInit) => MenuItem;
export declare const more: (init: CreateInit) => MenuItem;
