import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { TRIGGER_METHOD } from '../../analytics/types';
import { MatchCaseProps } from '../types';
export declare type FindProps = {
    findText?: string;
    count: {
        index: number;
        total: number;
    };
    shouldFocus: boolean;
    onFindBlur: () => void;
    onFind: (findText?: string) => void;
    onFindNext: ({ triggerMethod, }: {
        triggerMethod: TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.BUTTON;
    }) => void;
    onFindPrev: ({ triggerMethod, }: {
        triggerMethod: TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.BUTTON;
    }) => void;
    onFindTextfieldRefSet: (ref: React.RefObject<HTMLElement>) => void;
    onFocusElementRefSet: (ref: React.RefObject<HTMLElement>) => void;
    onCancel: ({ triggerMethod, }: {
        triggerMethod: TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.TOOLBAR | TRIGGER_METHOD.BUTTON;
    }) => void;
    onArrowDown: () => void;
} & MatchCaseProps;
export declare type FindState = {
    findText: string;
    isComposing: boolean;
};
declare const _default: React.ComponentClass<FindProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<{
        findText?: string | undefined;
        count: {
            index: number;
            total: number;
        };
        shouldFocus: boolean;
        onFindBlur: () => void;
        onFind: (findText?: string | undefined) => void;
        onFindNext: ({ triggerMethod, }: {
            triggerMethod: TRIGGER_METHOD.BUTTON | TRIGGER_METHOD.KEYBOARD;
        }) => void;
        onFindPrev: ({ triggerMethod, }: {
            triggerMethod: TRIGGER_METHOD.BUTTON | TRIGGER_METHOD.KEYBOARD;
        }) => void;
        onFindTextfieldRefSet: (ref: React.RefObject<HTMLElement>) => void;
        onFocusElementRefSet: (ref: React.RefObject<HTMLElement>) => void;
        onCancel: ({ triggerMethod, }: {
            triggerMethod: TRIGGER_METHOD.BUTTON | TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.TOOLBAR;
        }) => void;
        onArrowDown: () => void;
    } & MatchCaseProps & InjectedIntlProps>;
};
export default _default;
