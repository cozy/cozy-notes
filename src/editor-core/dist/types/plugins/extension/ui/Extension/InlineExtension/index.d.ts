import React from 'react';
import { Component } from 'react';
import { Node as PmNode } from 'prosemirror-model';
export interface Props {
    node: PmNode;
    children?: React.ReactNode;
}
export default class InlineExtension extends Component<Props, any> {
    render(): JSX.Element;
}
