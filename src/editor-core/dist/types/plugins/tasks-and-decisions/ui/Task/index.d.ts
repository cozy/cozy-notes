import React, { PureComponent, ReactElement } from 'react';
import { InjectedIntlProps } from 'react-intl';
import { ProviderFactory } from '@atlaskit/editor-common';
import { ContentRef } from '@atlaskit/task-decision';
export interface TaskProps {
    taskId: string;
    isDone: boolean;
    contentRef?: ContentRef;
    onChange?: (taskId: string, isChecked: boolean) => void;
    showPlaceholder?: boolean;
    children?: ReactElement<any>;
    providers?: ProviderFactory;
    disabled?: boolean;
}
export declare class TaskItem extends PureComponent<TaskProps & InjectedIntlProps, {}> {
    static displayName: string;
    private providerFactory;
    constructor(props: TaskProps & InjectedIntlProps);
    componentWillUnmount(): void;
    private renderWithProvider;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<TaskProps, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<TaskProps & InjectedIntlProps>;
};
export default _default;
