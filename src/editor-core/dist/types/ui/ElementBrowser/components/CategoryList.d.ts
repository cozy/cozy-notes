import React from 'react';
import { Category } from '../types';
interface Props {
    categories?: Category[];
    onSelectCategory: (category: Category) => void;
    selectedCategory?: string;
}
declare const MemoizedCategoryListWithAnalytics: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & import("@atlaskit/analytics-next").WithContextProps & React.RefAttributes<any>>>;
export default MemoizedCategoryListWithAnalytics;
