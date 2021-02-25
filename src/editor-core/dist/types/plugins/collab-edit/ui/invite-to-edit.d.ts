import React from 'react';
import { InviteToEditComponentProps } from '../types';
export interface InviteToEditButtonProps {
    onClick?: React.MouseEventHandler;
    selected?: boolean;
    Component?: React.ComponentType<InviteToEditComponentProps>;
    title: string;
}
export declare const InviteToEditButton: React.StatelessComponent<InviteToEditButtonProps>;
