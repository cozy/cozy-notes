import React from 'react';
import { UiComponentFactoryParams } from '../../types/ui-components';
export declare enum ToolbarSize {
    XXL = 6,
    XL = 5,
    L = 4,
    M = 3,
    S = 2,
    XXXS = 1
}
export declare type ToolbarUiComponentFactoryParams = UiComponentFactoryParams & {
    toolbarSize: ToolbarSize;
    isToolbarReducedSpacing: boolean;
    isLastItem?: boolean;
};
export declare type ToolbarUIComponentFactory = (params: ToolbarUiComponentFactoryParams) => React.ReactElement<any> | null;
