import React from 'react';
import { Modes } from '../types';
interface Props {
    onSearch: (value: string) => void;
    mode: keyof typeof Modes;
    focus: boolean;
    onClick: (e: React.MouseEvent) => void;
    searchTerm?: string;
}
declare const MemoizedElementSearchWithAnalytics: React.MemoExoticComponent<React.ForwardRefExoticComponent<Props & import("@atlaskit/analytics-next").WithContextProps & React.RefAttributes<any>>>;
export default MemoizedElementSearchWithAnalytics;
