import { Component } from 'react';
import { Node as PmNode } from 'prosemirror-model';
export declare const capitalizeFirstLetter: (str: string) => string;
export interface Props {
    node: PmNode;
}
export declare const ICON_SIZE = 24;
export default class ExtensionLozenge extends Component<Props, any> {
    render(): JSX.Element;
    private renderImage;
    private renderFallback;
}
