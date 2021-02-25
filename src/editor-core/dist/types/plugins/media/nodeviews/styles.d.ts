import React from 'react';
import { NumericalCardDimensions } from '@atlaskit/media-card';
export declare const FigureWrapper: import("styled-components").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>;
declare type MediaCardWrapperProps = {
    dimensions: NumericalCardDimensions;
    children: React.ReactNode;
    onContextMenu?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};
export declare const MediaCardWrapper: ({ dimensions, children, onContextMenu, }: MediaCardWrapperProps) => JSX.Element;
export {};
