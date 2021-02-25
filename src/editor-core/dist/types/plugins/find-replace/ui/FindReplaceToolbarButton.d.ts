import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { FindReplaceProps } from './FindReplace';
import { DispatchAnalyticsEvent } from '../../analytics/types';
export interface FindReplaceToolbarButtonProps extends Omit<FindReplaceProps, 'count'> {
    index: number;
    numMatches: number;
    isActive: boolean;
    onActivate: () => void;
    isReducedSpacing?: boolean;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
}
declare const _default: React.ComponentClass<FindReplaceToolbarButtonProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<FindReplaceToolbarButtonProps & InjectedIntlProps>;
};
export default _default;
