import { MentionDescription } from '@atlaskit/mention/resource';
import { UserRole } from '@atlaskit/mention';
import { SyntheticEvent } from 'react';
export interface OnMentionEvent {
    (mention: MentionDescription, event?: SyntheticEvent<any>): void;
}
export declare const INVITE_ITEM_DESCRIPTION: {
    id: string;
};
export interface Props {
    productName?: string;
    onMount?: () => void;
    onMouseEnter?: OnMentionEvent;
    onSelection?: OnMentionEvent;
    selected?: boolean;
    userRole?: UserRole;
}
declare const InviteItem: ({ productName, onMount, onMouseEnter, onSelection, selected, userRole, }: Props) => JSX.Element;
export default InviteItem;
