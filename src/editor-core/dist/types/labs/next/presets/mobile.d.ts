import React from 'react';
import { CustomMediaPicker } from '../../../plugins/media';
import { EditorPresetProps } from './types';
declare type EditorPresetMobileProps = {
    children?: React.ReactNode;
    placeholder?: string;
    maxContentSize?: number;
    createAnalyticsEvent?: any;
    media?: {
        picker?: CustomMediaPicker;
        allowMediaSingle?: boolean;
    };
} & EditorPresetProps;
export declare function useMobilePreset({ media, placeholder, maxContentSize, createAnalyticsEvent, featureFlags, }: EditorPresetMobileProps & EditorPresetProps): import("./preset").Preset<import("../../..").EditorPlugin>[];
export declare type MobilePresetProps = EditorPresetMobileProps & EditorPresetProps;
export declare function EditorPresetMobile(props: MobilePresetProps): JSX.Element;
export {};
