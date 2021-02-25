import React from 'react';
import PropTypes from 'prop-types';
import EditorActions from '../../actions';
export declare type EditorContextProps = {
    editorActions?: EditorActions;
};
export default class EditorContext extends React.Component<EditorContextProps, {}> {
    static childContextTypes: {
        editorActions: PropTypes.Requireable<any>;
    };
    private editorActions;
    constructor(props: EditorContextProps);
    getChildContext(): {
        editorActions: EditorActions<any>;
    };
    render(): string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ReactPortal | null | undefined;
}
