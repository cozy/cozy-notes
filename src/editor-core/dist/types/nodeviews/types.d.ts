import { Node as PMNode } from 'prosemirror-model';
export interface ReactNodeProps {
    selected: boolean;
}
export declare type ProsemirrorGetPosHandler = () => number;
export declare type getPosHandler = getPosHandlerNode | boolean;
export declare type getPosHandlerNode = () => number;
export declare type ReactComponentProps = {
    [key: string]: unknown;
};
export declare type ForwardRef = (node: HTMLElement | null) => void;
export declare type shouldUpdate = (nextNode: PMNode) => boolean;
