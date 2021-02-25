import React from 'react';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import { EditorProps } from './internal/editor-props-type';
export interface MobileEditorProps extends EditorProps {
    isMaxContentSizeReached?: boolean;
    maxHeight?: number;
}
export declare function MobileEditor(props: MobileEditorProps & WithAnalyticsEventsProps): JSX.Element;
export declare namespace MobileEditor {
    var displayName: string;
}
export declare const Mobile: React.ForwardRefExoticComponent<Pick<MobileEditorProps & WithAnalyticsEventsProps, "disabled" | "children" | "placeholder" | "defaultValue" | "onChange" | "maxHeight" | "onAnalyticsEvent" | "plugins" | "popupsMountPoint" | "popupsBoundariesElement" | "popupsScrollableElement" | "onDestroy" | "onMount" | "transformer" | "onSave" | "onCancel" | "isMaxContentSizeReached"> & React.RefAttributes<any>>;
