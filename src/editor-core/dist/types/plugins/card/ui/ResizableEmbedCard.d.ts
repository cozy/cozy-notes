import React from 'react';
import { RichMediaLayout } from '@atlaskit/adf-schema';
import { Props } from '../../../ui/Resizer/types';
declare type State = {
    offsetLeft: number;
    resizedPctWidth?: number;
};
export default class ResizableEmbedCard extends React.Component<Props, State> {
    state: State;
    componentDidUpdate(): void;
    get wrappedLayout(): boolean;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    /**
     * When returning to center layout from a wrapped/aligned layout, it might actually
     * be wide or full-width
     */
    checkLayout(oldLayout: RichMediaLayout, newLayout: RichMediaLayout): void;
    calcNewSize: (newWidth: number, stop: boolean) => {
        width: number | null;
        layout: RichMediaLayout;
    };
    calcUnwrappedLayout: (pct: number, width: number) => 'center' | 'wide' | 'full-width';
    get $pos(): import("prosemirror-model").ResolvedPos<any> | null;
    /**
     * The maxmimum number of grid columns this node can resize to.
     */
    get gridWidth(): number;
    calcOffsetLeft(): number;
    calcColumnLeftOffset: () => number;
    wrapper?: HTMLElement;
    calcSnapPoints(): number[];
    calcPxWidth: (useLayout?: "center" | "full-width" | "wrap-right" | "wrap-left" | "wide" | "align-end" | "align-start" | undefined) => number;
    get insideInlineLike(): boolean;
    highlights: (newWidth: number, snapPoints: number[]) => number[] | string[];
    render(): JSX.Element;
}
export {};
