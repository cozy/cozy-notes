/// <reference types="react-intl" />
import PropTypes from 'prop-types';
import { EditorPropsExtended } from '../editor-props-type';
export declare function EditorInternal({ onAnalyticsEvent, disabled, transformer, defaultValue, plugins, portalProviderAPI, popupsMountPoint, popupsBoundariesElement, popupsScrollableElement, onChange, onDestroy, onMount, children, }: EditorPropsExtended, context: any): JSX.Element;
export declare namespace EditorInternal {
    var contextTypes: {
        editorActions: PropTypes.Requireable<any>;
        intl: ReactIntl.IntlShape;
    };
}
