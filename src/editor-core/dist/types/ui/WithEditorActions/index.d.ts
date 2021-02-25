import React from 'react';
import PropTypes from 'prop-types';
import EditorActions from '../../actions';
export interface WithEditorActionsProps {
    render(actions: EditorActions): React.ReactElement<any> | null;
}
export default class WithEditorActions extends React.Component<WithEditorActionsProps, any> {
    static contextTypes: {
        editorActions: PropTypes.Validator<any>;
    };
    context: {
        editorActions: EditorActions;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onContextUpdate;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
}
