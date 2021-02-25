/// <reference types="react" />
import { Schema } from 'prosemirror-model';
import { Transformer } from '@atlaskit/editor-common';
import EditorActions from '../../../actions';
import { EditorPlugin } from '../../../types';
import { FireAnalyticsCallback } from '../../../plugins/analytics';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
export declare type EditorProps = {
    plugins?: Array<EditorPlugin>;
    transformer?: (schema: Schema) => Transformer<any>;
    children?: React.ReactChild;
    defaultValue?: string | object;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    disabled?: boolean;
    placeholder?: string;
    onAnalyticsEvent?: FireAnalyticsCallback;
    onChange?: (value: any, meta: {
        source: 'remote' | 'local';
    }) => void;
    onSave?: (value: any) => void;
    onCancel?: (value: any) => void;
    onMount?: (actions: EditorActions) => void;
    onDestroy?: () => void;
};
export declare type EditorPropsExtended = EditorProps & {
    portalProviderAPI: PortalProviderAPI;
};
