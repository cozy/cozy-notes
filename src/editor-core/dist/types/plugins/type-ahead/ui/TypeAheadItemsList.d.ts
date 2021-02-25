import React from 'react';
import { TypeAheadItem } from '../types';
export declare const ItemIcon: import("styled-components").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare type TypeAheadItemsListProps = {
    items?: Array<TypeAheadItem>;
    currentIndex: number;
    insertByIndex: (index: number) => void;
    setCurrentIndex: (index: number) => void;
};
export declare function scrollIntoViewIfNeeded(element: HTMLElement): void;
export declare function TypeAheadItemsList({ items, currentIndex, insertByIndex, setCurrentIndex, }: TypeAheadItemsListProps): JSX.Element | null;
export declare type TypeAheadItemComponentProps = {
    item: TypeAheadItem;
    index: number;
    currentIndex: number;
    insertByIndex: (index: number) => void;
    setCurrentIndex: (index: number) => void;
};
export declare class TypeAheadItemComponent extends React.Component<TypeAheadItemComponentProps, {
    ref: HTMLElement | null;
}> {
    state: {
        ref: null;
    };
    shouldComponentUpdate(nextProps: TypeAheadItemComponentProps): boolean;
    isSelected(props: TypeAheadItemComponentProps): boolean;
    insertByIndex: () => void;
    setCurrentIndex: () => void;
    handleRef: (ref: HTMLElement | null) => void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
