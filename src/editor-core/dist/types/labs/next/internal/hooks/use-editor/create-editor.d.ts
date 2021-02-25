import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import EditorActions from '../../../../../actions';
import { PortalProviderAPI } from '../../../../../ui/PortalProvider';
import { EditorSharedConfig } from '../../context/shared-config';
import { EditorPropsExtended } from '../../editor-props-type';
export declare function createEditor({ context, onAnalyticsEvent, transformer, providerFactory, plugins, portalProviderAPI, defaultValue, ref, popupsMountPoint, popupsBoundariesElement, popupsScrollableElement, editorActions, disabled, onChange, onDestroy, onMount, }: CreateEditorParams): EditorSharedConfig | null;
export declare type CreateEditorParams = Pick<EditorPropsExtended, 'defaultValue' | 'plugins' | 'popupsMountPoint' | 'popupsBoundariesElement' | 'popupsScrollableElement' | 'onChange' | 'disabled' | 'transformer' | 'onAnalyticsEvent' | 'onDestroy' | 'onMount'> & {
    context: any;
    ref?: HTMLDivElement | null;
    providerFactory: ProviderFactory;
    portalProviderAPI: PortalProviderAPI;
    createAnalyticsEvent?: CreateUIAnalyticsEvent;
    editorActions: EditorActions;
};
