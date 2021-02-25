import React from 'react';
import { QuickInsertItem } from '@atlaskit/editor-common/provider-factory';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import { Modes, SelectedItemProps } from '../../types';
export interface Props {
    items: QuickInsertItem[];
    mode: keyof typeof Modes;
    onInsertItem: (item: QuickInsertItem) => void;
    setColumnCount: (columnCount: number) => void;
    setFocusedItemIndex: (index: number) => void;
}
declare const MemoizedElementListWithAnalytics: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<Props & SelectedItemProps & WithAnalyticsEventsProps & import("@atlaskit/analytics-next").WithContextProps, "mode" | "analyticsContext" | "createAnalyticsEvent" | "items" | "selectedItemIndex" | "focusedItemIndex" | "setColumnCount" | "onInsertItem" | "setFocusedItemIndex"> & React.RefAttributes<any>>>;
export default MemoizedElementListWithAnalytics;
