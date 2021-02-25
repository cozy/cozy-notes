import React from 'react';
import { AlignmentPluginState, AlignmentState } from '../../pm-plugins/types';
export interface State {
    isOpen: boolean;
}
export interface Props {
    pluginState: AlignmentPluginState;
    changeAlignment: (align: AlignmentState) => void;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    isReducedSpacing?: boolean;
    disabled?: boolean;
}
declare class AlignmentToolbar extends React.Component<Props, State> {
    static displayName: string;
    state: State;
    render(): JSX.Element;
    private changeAlignment;
    private toggleOpen;
    private handleOpenChange;
    private hide;
}
export default AlignmentToolbar;
