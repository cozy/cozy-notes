import React from 'react';
export declare type ButtonAppearance = 'subtle' | 'danger';
export interface Props {
    title?: string;
    icon?: React.ReactElement<any>;
    iconAfter?: React.ReactElement<any>;
    onClick?: React.MouseEventHandler;
    onMouseEnter?: <T>(event: React.MouseEvent<T>) => void;
    onMouseLeave?: <T>(event: React.MouseEvent<T>) => void;
    selected?: boolean;
    disabled?: boolean;
    appearance?: ButtonAppearance;
    href?: string;
    target?: string;
    children?: React.ReactNode;
    className?: string;
    tooltipContent?: React.ReactNode;
    testId?: string;
    hideTooltipOnClick?: boolean;
}
declare const _default: ({ title, icon, iconAfter, onClick, onMouseEnter, onMouseLeave, selected, disabled, href, target, appearance, children, className, tooltipContent, testId, hideTooltipOnClick, }: Props) => JSX.Element;
export default _default;
