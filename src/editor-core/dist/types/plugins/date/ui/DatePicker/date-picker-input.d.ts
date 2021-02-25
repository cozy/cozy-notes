import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { DispatchAnalyticsEvent } from '../../../analytics';
import { DateType } from '../../types';
export interface InputProps {
    /** Locale code string (eg. "en-AU") */
    locale: string;
    date: DateType;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
    onNewDate: (date: DateType) => void;
    onSubmitDate: (date: DateType | null) => void;
    onEmptySubmit: () => void;
    /** Automatically focus the text field */
    autoFocus?: boolean;
    /** Automatically select all text in the field. Requires autoFocus to be true. */
    autoSelectAll?: boolean;
}
export interface InputState {
    inputText: string;
}
declare const _default: React.ComponentClass<InputProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<InputProps & InjectedIntlProps>;
};
export default _default;
