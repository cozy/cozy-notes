import React from 'react';
import { MentionProvider } from '@atlaskit/mention/resource';
import { MediaProvider } from '../../../plugins/media';
import { EditorPresetProps } from './types';
export declare type EditorPresetCXHTMLProps = {
    children?: React.ReactNode;
    placeholder?: string;
    mentionProvider?: Promise<MentionProvider>;
    mediaProvider?: Promise<MediaProvider>;
} & EditorPresetProps;
export declare function useCXHTMLPreset({ mentionProvider, mediaProvider, placeholder, featureFlags, }: EditorPresetCXHTMLProps): import("./preset").Preset<import("../../..").EditorPlugin>[];
export declare function EditorPresetCXHTML(props: EditorPresetCXHTMLProps): JSX.Element;
