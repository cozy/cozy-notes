import React from 'react';
import { RefObject } from 'react';
import { Resizable } from 're-resizable';
import { RichMediaLayout } from '@atlaskit/adf-schema';
import { Props as ResizableMediaSingleProps, EnabledHandles } from './types';
import { DispatchAnalyticsEvent } from '../../plugins/analytics';
export interface ResizableNumberSize {
    width: number;
    height: number;
}
declare type ResizerProps = ResizableMediaSingleProps & {
    selected?: boolean;
    enable: EnabledHandles;
    calcNewSize: (newWidth: number, stop: boolean) => {
        layout: RichMediaLayout;
        width: number | null;
    };
    snapPoints: number[];
    scaleFactor?: number;
    highlights: (width: number, snapPoints: number[]) => number[] | string[];
    handleResizeStart?: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => boolean;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
    nodeType?: 'media' | 'embed';
    innerPadding?: number;
};
declare type ResizerState = {
    isResizing: boolean;
};
export default class Resizer extends React.Component<ResizerProps, ResizerState> {
    resizable: RefObject<Resizable>;
    state: {
        isResizing: boolean;
    };
    private handleResizeStart;
    private handleResize;
    private handleResizeStop;
    render(): JSX.Element;
}
export {};
