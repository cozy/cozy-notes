import React from 'react';
import { RichMediaLayout as MediaSingleLayout } from '@atlaskit/adf-schema';
import { MediaClientConfig } from '@atlaskit/media-core';
import { Props } from './types';
declare type State = {
    offsetLeft: number;
    isVideoFile: boolean;
    resizedPctWidth?: number;
};
export default class ResizableMediaSingle extends React.Component<Props, State> {
    state: State;
    componentDidUpdate(): boolean;
    get wrappedLayout(): boolean;
    componentDidMount(): Promise<void>;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    checkVideoFile(viewMediaClientConfig?: MediaClientConfig): Promise<void>;
    /**
     * When returning to center layout from a wrapped/aligned layout, it might actually
     * be wide or full-width
     */
    checkLayout(oldLayout: MediaSingleLayout, newLayout: MediaSingleLayout): void;
    calcNewSize: (newWidth: number, stop: boolean) => {
        width: number | null;
        layout: MediaSingleLayout;
    };
    calcUnwrappedLayout: (pct: number, width: number) => 'center' | 'wide' | 'full-width';
    get $pos(): import("prosemirror-model").ResolvedPos<any> | null;
    /**
     * The maxmimum number of grid columns this node can resize to.
     */
    get gridWidth(): number;
    calcColumnLeftOffset: () => number;
    wrapper?: HTMLElement;
    calcPxWidth: (useLayout?: "center" | "full-width" | "wrap-right" | "wrap-left" | "wide" | "align-end" | "align-start" | undefined) => number;
    get insideInlineLike(): boolean;
    get insideLayout(): boolean;
    highlights: (newWidth: number, snapPoints: number[]) => number[] | string[];
    private saveWrapper;
    render(): JSX.Element;
}
export declare function calcOffsetLeft(insideInlineLike: boolean, insideLayout: boolean, pmViewDom: Element, wrapper?: HTMLElement): number;
export {};
