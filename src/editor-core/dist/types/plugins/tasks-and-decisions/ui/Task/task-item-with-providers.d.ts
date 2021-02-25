import { Component, ReactElement } from 'react';
import { ContextIdentifierProvider } from '@atlaskit/editor-common';
import { ContentRef, TaskDecisionProvider } from '@atlaskit/task-decision';
export interface Props {
    taskId: string;
    isDone: boolean;
    contentRef?: ContentRef;
    onChange?: (taskId: string, isChecked: boolean) => void;
    showPlaceholder?: boolean;
    placeholder?: string;
    children?: ReactElement<any>;
    taskDecisionProvider?: Promise<TaskDecisionProvider>;
    contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
}
export interface State {
    resolvedContextProvider?: ContextIdentifierProvider;
}
export default class TaskItemWithProviders extends Component<Props, State> {
    static displayName: string;
    state: State;
    private mounted;
    UNSAFE_componentWillMount(): void;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    private updateContextIdentifierProvider;
    render(): JSX.Element;
}
