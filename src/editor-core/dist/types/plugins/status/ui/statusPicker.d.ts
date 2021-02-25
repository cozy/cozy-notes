import React from 'react';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { ColorType as Color } from '@atlaskit/status/picker';
import { StatusType } from '../plugin';
export declare enum InputMethod {
    blur = "blur",
    escKey = "escKey",
    enterKey = "enterKey"
}
export interface Props {
    target: HTMLElement | null;
    closeStatusPicker: () => void;
    onSelect: (status: StatusType) => void;
    onTextChanged: (status: StatusType, isNew: boolean) => void;
    onEnter: (status: StatusType) => void;
    isNew?: boolean;
    defaultText?: string;
    defaultColor?: Color;
    defaultLocalId?: string;
    createAnalyticsEvent?: CreateUIAnalyticsEvent;
}
export interface State {
    color: Color;
    text: string;
    localId?: string;
    isNew?: boolean;
}
export declare class StatusPickerWithoutAnalytcs extends React.Component<Props, State> {
    private startTime;
    private inputMethod?;
    private createStatusAnalyticsAndFireFunc;
    constructor(props: Props);
    private fireStatusPopupOpenedAnalytics;
    private fireStatusPopupClosedAnalytics;
    private reset;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, _snapshot?: any): void;
    private extractStateFromProps;
    handleClickOutside: (event: Event) => void;
    private handleEscapeKeydown;
    render(): JSX.Element | null;
    private onColorHover;
    private onColorClick;
    private onTextChanged;
    private onEnter;
    private handlePopupClick;
}
declare const _default: React.ForwardRefExoticComponent<Pick<Props, "target" | "onSelect" | "isNew" | "onTextChanged" | "defaultColor" | "closeStatusPicker" | "onEnter" | "defaultText" | "defaultLocalId"> & React.RefAttributes<any>>;
export default _default;
