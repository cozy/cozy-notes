import React from 'react';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import { ExtensionManifest } from '@atlaskit/editor-common';
import { FieldDefinition, Parameters, OnSaveCallback } from '@atlaskit/editor-common/extensions';
declare type Props = {
    extensionManifest?: ExtensionManifest;
    fields?: FieldDefinition[];
    parameters?: Parameters;
    autoSave?: boolean;
    autoSaveTrigger?: unknown;
    showHeader?: boolean;
    closeOnEsc?: boolean;
    onChange: OnSaveCallback;
    onCancel: () => void;
    errorMessage: string | null;
    isLoading?: boolean;
} & WithAnalyticsEventsProps;
declare const _default: React.ForwardRefExoticComponent<Pick<Pick<Props, "autoSave" | "onChange" | "isLoading" | "fields" | "parameters" | "onCancel" | "errorMessage" | "extensionManifest" | "autoSaveTrigger" | "showHeader" | "closeOnEsc"> & React.RefAttributes<any> & import("@atlaskit/analytics-next").WithContextProps, "autoSave" | "onChange" | "analyticsContext" | "isLoading" | "key" | "fields" | "parameters" | "onCancel" | "errorMessage" | "extensionManifest" | "autoSaveTrigger" | "showHeader" | "closeOnEsc"> & React.RefAttributes<any>>;
export default _default;
