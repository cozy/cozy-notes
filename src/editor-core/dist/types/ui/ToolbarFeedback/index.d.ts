import { PureComponent } from 'react';
import PropTypes from 'prop-types';
export declare type EditorProduct = 'bitbucket' | 'jira' | 'confluence' | 'stride' | undefined;
export interface Props {
    /** @deprecated  To pass package version use feedbackInfo property – <Editor feedbackInfo={{ packageVersion }} /> */
    packageVersion?: string;
    /** @deprecated  'To pass package name use feedbackInfo property – <Editor feedbackInfo={{ packageName }} /> */
    packageName?: string;
    product?: EditorProduct;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    /** @deprecated 'To pass feedback labels use feedbackInfo property – <Editor feedbackInfo={{ labels }} />' */
    labels?: string[];
}
export interface State {
    jiraIssueCollectorScriptLoading: boolean;
    showOptOutOption?: boolean;
    target?: HTMLElement;
}
declare global {
    interface Window {
        jQuery: any;
        ATL_JQ_PAGE_PROPS: any;
    }
}
export default class ToolbarFeedback extends PureComponent<Props, State> {
    static contextTypes: {
        editorActions: PropTypes.Validator<any>;
    };
    state: State;
    constructor(props: Props);
    private handleRef;
    showJiraCollectorDialogCallback?: () => void;
    private getFeedbackInfo;
    render(): JSX.Element | null;
    private collectFeedback;
    private toggleShowOptOutOption;
    private openJiraIssueCollector;
    private openFeedbackPopup;
    private openLearnMorePage;
    private hasJquery;
}
