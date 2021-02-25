import React from 'react';
import { TRIGGER_METHOD, DispatchAnalyticsEvent } from '../../analytics/types';
import { MatchCaseProps } from '../types';
export declare type FindReplaceProps = {
    findText?: string;
    replaceText?: string;
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
    onReplace: ({ triggerMethod, replaceText, }: {
        triggerMethod: TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.BUTTON;
        replaceText: string;
    }) => void;
    onReplaceAll: ({ replaceText }: {
        replaceText: string;
    }) => void;
    onCancel: ({ triggerMethod, }: {
        triggerMethod: TRIGGER_METHOD.KEYBOARD | TRIGGER_METHOD.TOOLBAR | TRIGGER_METHOD.BUTTON;
    }) => void;
    onFocusElementRefSet: (ref: React.RefObject<HTMLElement>) => void;
    dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
} & MatchCaseProps;
interface FindReplaceState {
    findTextfieldRef?: React.RefObject<HTMLElement>;
    replaceTextfieldRef?: React.RefObject<HTMLElement>;
}
declare class FindReplace extends React.PureComponent<FindReplaceProps, FindReplaceState> {
    state: FindReplaceState;
    setFindTextfieldRef: (findTextfieldRef: React.RefObject<HTMLElement>) => void;
    setReplaceTextfieldRef: (replaceTextfieldRef: React.RefObject<HTMLElement>) => void;
    setFocusToFind: () => void;
    setFocusToReplace: () => void;
    render(): JSX.Element;
}
export default FindReplace;
