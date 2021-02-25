import React from 'react';
import PropTypes from 'prop-types';
import { EditorProps } from '../../editor';
import EditorActions from '../../actions';
export interface EditorWithActionsPropsOverride extends EditorProps {
    onSave?: any;
    onChange?: any;
    onCancel?: any;
}
export interface EditorWithActionsProps extends EditorWithActionsPropsOverride {
    onSave?: (actions: EditorActions) => void;
    onChange?: (actions: EditorActions) => void;
    onCancel?: (actions: EditorActions) => void;
}
export default class EditorWithActions extends React.Component<EditorWithActionsProps, {}> {
    static contextTypes: {
        editorActions: PropTypes.Validator<any>;
    };
    context: {
        editorActions?: EditorActions;
    };
    handleSave: (actions: EditorActions) => () => void;
    handleCancel: (actions: EditorActions) => () => void;
    handleChange: (actions: EditorActions) => () => void;
    render(): JSX.Element;
}
