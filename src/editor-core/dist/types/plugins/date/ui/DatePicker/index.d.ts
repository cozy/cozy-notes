import React from 'react';
import { DateType } from '../../types';
import { INPUT_METHOD } from '../../../analytics/types/enums';
import { DispatchAnalyticsEvent } from '../../../analytics';
import { InjectedIntlProps } from 'react-intl';
export interface Props {
    element: HTMLElement | null;
    closeDatePicker: () => void;
    /** Whether the date is newly created, selcting and focusing the input */
    isNew: boolean;
    /** Whether to automatically focus the input */
    autoFocus?: boolean;
    onSelect: (date: DateType | null, commitMethod: INPUT_METHOD.PICKER | INPUT_METHOD.KEYBOARD) => void;
    onDelete: () => void;
    mountTo?: HTMLElement;
    boundariesElement?: HTMLElement;
    scrollableElement?: HTMLElement;
    closeDatePickerWithAnalytics: ({ date }: {
        date?: DateType;
    }) => void;
    onTextChanged: (date: DateType) => void;
    showTextField?: boolean;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
}
export interface State {
    date: DateType;
    selected: Array<string>;
    setInputSelectionPos?: number;
    latestValidDate: DateType;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
