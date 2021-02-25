import React from 'react';
import ToolbarButton from '../../../../ui/ToolbarButton';
export interface DropDownButtonProps {
    label: string;
    selected: boolean;
    disabled?: boolean;
    onClick: React.MouseEventHandler;
    spacing: 'none' | 'default';
    handleRef(el: ToolbarButton): void;
}
export declare const DropDownButton: React.StatelessComponent<DropDownButtonProps>;
