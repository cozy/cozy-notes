import React from 'react';
import { QuickInsertItem } from '@atlaskit/editor-common/provider-factory';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import { Category, Modes } from '../types';
export declare type StatelessElementBrowserProps = {
    categories?: Category[];
    items: QuickInsertItem[];
    onSearch: (searchTerm: string) => void;
    onSelectCategory: (category: Category) => void;
    onSelectItem?: (item: QuickInsertItem) => void;
    onInsertItem: (item: QuickInsertItem) => void;
    selectedCategory?: string;
    showSearch: boolean;
    showCategories: boolean;
    mode: keyof typeof Modes;
    searchTerm?: string;
} & WithAnalyticsEventsProps;
declare const MemoizedElementBrowser: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<Pick<StatelessElementBrowserProps, "mode" | "items" | "onInsertItem" | "categories" | "onSelectCategory" | "selectedCategory" | "onSearch" | "searchTerm" | "onSelectItem" | "showCategories" | "showSearch"> & React.RefAttributes<any> & import("@atlaskit/analytics-next").WithContextProps, "mode" | "analyticsContext" | "key" | "items" | "onInsertItem" | "categories" | "onSelectCategory" | "selectedCategory" | "onSearch" | "searchTerm" | "onSelectItem" | "showCategories" | "showSearch"> & React.RefAttributes<any>>>;
export default MemoizedElementBrowser;
