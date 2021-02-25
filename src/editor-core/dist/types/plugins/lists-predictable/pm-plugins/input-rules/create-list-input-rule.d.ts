import { NodeType } from 'prosemirror-model';
import { InputRuleWithHandler } from '../../../../utils/input-rules';
declare type Props = {
    listType: NodeType;
    expression: RegExp;
};
export declare function createRuleForListType({ listType, expression }: Props): InputRuleWithHandler;
export {};
