import React from 'react';
import { EditorView } from 'prosemirror-view';
export declare type Props = {
    visible: boolean;
    width?: number;
    children?: React.ReactElement;
};
export declare const DEFAULT_CONTEXT_PANEL_WIDTH = 360;
declare type StyleProps = {
    panelWidth: number;
};
export declare const Panel: import("styled-components").StyledComponentClass<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & StyleProps & {
    visible: boolean;
}, any, React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & StyleProps & {
    visible: boolean;
}>;
export declare const Content: import("styled-components").StyledComponentClass<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & StyleProps, any, React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & StyleProps>;
declare type SwappableContentAreaProps = {
    pluginContent?: React.ReactNode;
    editorView?: EditorView;
} & Props;
declare type State = {
    mounted: boolean;
    currentPluginContent?: React.ReactNode;
};
export declare class SwappableContentArea extends React.PureComponent<SwappableContentAreaProps, State> {
    state: {
        mounted: boolean;
        currentPluginContent: undefined;
    };
    static getDerivedStateFromProps(props: SwappableContentAreaProps, state: State): State | null;
    private unsetPluginContent;
    componentDidMount(): void;
    showPluginContent: () => JSX.Element | undefined;
    showProvidedContent: (isVisible: boolean) => JSX.Element | undefined;
    render(): JSX.Element;
}
export default class ContextPanel extends React.Component<Props> {
    static defaultProps: {
        width: number;
    };
    render(): JSX.Element;
}
export {};
