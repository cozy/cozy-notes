import { ResolvedPos } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
declare type DeleteAction = (props: {
    tr: Transaction;
    $next: ResolvedPos;
    $head: ResolvedPos;
}) => boolean;
export declare const joinListItemWithParagraph: DeleteAction;
export {};
