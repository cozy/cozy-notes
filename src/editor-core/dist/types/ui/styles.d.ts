import { HTMLAttributes, ComponentClass } from 'react';
export declare const ButtonGroup: ComponentClass<HTMLAttributes<{}> & {
    width?: 'small' | 'large';
}>;
export declare const Separator: ComponentClass<HTMLAttributes<{}>>;
export declare const Wrapper: ComponentClass<HTMLAttributes<{}> & {
    isSmall?: boolean;
}>;
export declare const ExpandIconWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const TriggerWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const MenuWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const ButtonContent: ComponentClass<HTMLAttributes<{}> & {
    spacing: string;
}>;
export declare const dropShadow: import("styled-components").InterpolationValue[];
export declare const scrollbarStyles: string;
export declare const Shortcut: import("styled-components").StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const ClickSelectWrapper: React.ComponentClass<React.HTMLAttributes<{}>>;
declare type CellColourPreviewProps = {
    selectedColor: string;
};
export declare const CellColourPreview: import("styled-components").StyledComponentClass<import("react").ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & CellColourPreviewProps, any, import("react").ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & CellColourPreviewProps>;
export {};
