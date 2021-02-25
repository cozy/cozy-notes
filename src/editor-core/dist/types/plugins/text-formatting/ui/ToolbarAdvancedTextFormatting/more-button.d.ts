import React from 'react';
export interface MoreButtonProps {
    disabled: boolean;
    onClick: React.MouseEventHandler;
    selected?: boolean;
    spacing: 'default' | 'compact' | 'none';
    title: string;
}
export declare const MoreButton: React.StatelessComponent<MoreButtonProps>;
