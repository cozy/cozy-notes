import React from 'react';
import { PureComponent } from 'react';
import { LinkSearchListItemData } from './types';
export declare const List: import("styled-components").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>>;
export interface Props {
    items?: LinkSearchListItemData[];
    isLoading: boolean;
    selectedIndex: number;
    onSelect: (href: string, text: string) => void;
    onMouseMove: (objectId: string) => void;
}
export default class LinkSearchList extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
