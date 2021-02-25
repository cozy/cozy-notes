import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { TRIGGER_METHOD, DispatchAnalyticsEvent } from '../../analytics/types';
export declare type ReplaceProps = {
    canReplace: boolean;
    replaceText?: string;
    onReplace: ({ triggerMethod, replaceText, }: {
        triggerMethod: TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.BUTTON;
        replaceText: string;
    }) => void;
    onReplaceAll: ({ replaceText }: {
        replaceText: string;
    }) => void;
    onReplaceTextfieldRefSet: (ref: React.RefObject<HTMLElement>) => void;
    onFocusElementRefSet: (ref: React.RefObject<HTMLElement>) => void;
    onArrowUp: () => void;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
};
export declare type ReplaceState = {
    replaceText: string;
    isComposing: boolean;
};
declare const _default: React.ComponentClass<ReplaceProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<ReplaceProps & InjectedIntlProps>;
};
export default _default;
