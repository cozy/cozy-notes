import { ReactElement } from 'react';
import { Node, Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import EditorActions from '../actions';
import { ContextIdentifierProvider, ErrorReportingHandler, ExtensionHandlers, ExtensionProvider, SearchProvider, Providers, Transformer } from '@atlaskit/editor-common';
import { ActivityProvider } from '@atlaskit/activity-provider';
import { MentionProvider } from '@atlaskit/mention/resource';
import { TaskDecisionProvider } from '@atlaskit/task-decision';
import { PluginConfig as TablesPluginConfig } from '../plugins/table/types';
import { TextColorPluginConfig } from '../plugins/text-color/pm-plugins/main';
import { MediaOptions, MediaState } from '../plugins/media/types';
import { CollabEditOptions } from '../plugins/collab-edit/types';
import { CardOptions } from '../plugins/card/types';
import { QuickInsertOptions } from '../plugins/quick-insert/types';
import { AnnotationProviders } from '../plugins/annotation/types';
import { TextFormattingOptions } from '../plugins/text-formatting/types';
import { PlaceholderTextOptions } from '../plugins/placeholder-text/types';
import { BlockTypePluginOptions } from '../plugins/block-type/types';
import { CodeBlockOptions } from '../plugins/code-block/types';
import { LayoutPluginOptions } from '../plugins/layout/types';
import { FindReplaceOptions } from '../plugins/find-replace/types';
import { ExtensionConfig } from './extension-config';
import { EditorAppearance } from './editor-appearance';
import { MenuItem } from '../ui/DropdownMenu/types';
import { EditorOnChangeHandler } from './editor-onchange';
import { TransactionTracking, PerformanceTracking } from './performance-tracking';
import { PanelPluginConfig } from './../plugins/panel/types';
export declare type ReactComponents = ReactElement<any> | ReactElement<any>[];
declare type ExtensionProviders = (ExtensionProvider | Promise<ExtensionProvider>)[];
declare type ExtensionProvidersWithEditorAction = (editorActions?: EditorActions) => ExtensionProviders;
export declare type ExtensionProvidersProp = ExtensionProviders | ExtensionProvidersWithEditorAction;
export declare type FeedbackInfo = {
    product?: string;
    packageVersion?: string;
    packageName?: string;
    labels?: Array<string>;
};
export interface EditorProps {
    appearance?: EditorAppearance;
    contentComponents?: ReactComponents;
    primaryToolbarComponents?: ReactComponents;
    primaryToolbarIconBefore?: ReactElement;
    secondaryToolbarComponents?: ReactComponents;
    allowAnalyticsGASV3?: boolean;
    allowBlockType?: BlockTypePluginOptions['allowBlockType'];
    allowTasksAndDecisions?: boolean;
    allowBreakout?: boolean;
    allowRule?: boolean;
    allowTextColor?: boolean | TextColorPluginConfig;
    allowTables?: boolean | TablesPluginConfig;
    allowHelpDialog?: boolean;
    feedbackInfo?: FeedbackInfo;
    allowJiraIssue?: boolean;
    allowPanel?: boolean | PanelPluginConfig;
    allowExtension?: boolean | ExtensionConfig;
    allowConfluenceInlineComment?: boolean;
    allowTemplatePlaceholders?: boolean | PlaceholderTextOptions;
    allowDate?: boolean;
    allowLayouts?: boolean | LayoutPluginOptions;
    allowStatus?: boolean | {
        menuDisabled: boolean;
    };
    allowDynamicTextSizing?: boolean;
    allowTextAlignment?: boolean;
    allowIndentation?: boolean;
    /**
     * This enables new insertion behaviour only for horizontal rule and media single in certain conditions.
     * The idea of this new behaviour is to have a consistent outcome regardless of the insertion method.
     **/
    allowNewInsertionBehaviour?: boolean;
    /**
     * Set this to false to opt out of the default behaviour of auto scrolling into view
     * whenever the document is changed
     */
    autoScrollIntoView?: boolean;
    allowFindReplace?: boolean | FindReplaceOptions;
    quickInsert?: QuickInsertOptions;
    UNSAFE_cards?: CardOptions;
    allowExpand?: boolean | {
        allowInsertion?: boolean;
        allowInteractiveExpand?: boolean;
    };
    saveOnEnter?: boolean;
    shouldFocus?: boolean;
    disabled?: boolean;
    contextPanel?: ReactComponents;
    errorReporterHandler?: ErrorReportingHandler;
    uploadErrorHandler?: (state: MediaState) => void;
    activityProvider?: Promise<ActivityProvider>;
    searchProvider?: Promise<SearchProvider>;
    annotationProviders?: AnnotationProviders;
    collabEditProvider?: Providers['collabEditProvider'];
    presenceProvider?: Promise<any>;
    emojiProvider?: Providers['emojiProvider'];
    taskDecisionProvider?: Promise<TaskDecisionProvider>;
    allowNestedTasks?: boolean;
    contextIdentifierProvider?: Promise<ContextIdentifierProvider>;
    legacyImageUploadProvider?: Providers['imageUploadProvider'];
    mentionProvider?: Promise<MentionProvider>;
    autoformattingProvider?: Providers['autoformattingProvider'];
    macroProvider?: Providers['macroProvider'];
    waitForMediaUpload?: boolean;
    contentTransformerProvider?: (schema: Schema) => Transformer<string>;
    media?: MediaOptions;
    collabEdit?: CollabEditOptions;
    textFormatting?: TextFormattingOptions;
    maxHeight?: number;
    maxContentSize?: number;
    placeholder?: string;
    placeholderHints?: string[];
    placeholderBracketHint?: string;
    allowKeyboardAccessibleDatepicker?: boolean;
    defaultValue?: Node | string | Object;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    insertMenuItems?: MenuItem[];
    editorActions?: EditorActions;
    onEditorReady?: (editorActions: EditorActions) => void;
    onDestroy?: () => void;
    onChange?: EditorOnChangeHandler;
    onSave?: (editorView: EditorView) => void;
    onCancel?: (editorView: EditorView) => void;
    extensionHandlers?: ExtensionHandlers;
    sanitizePrivateContent?: boolean;
    mentionInsertDisplayName?: boolean;
    /**
     * @description The nth keystroke after which an input time taken event is sent, 0 to disable it
     * @default 100
     * @deprecated Use performanceTracking.inputSampling instead https://product-fabric.atlassian.net/browse/ED-10260
     */
    inputSamplingLimit?: number;
    extensionProviders?: ExtensionProvidersProp;
    UNSAFE_predictableLists?: boolean;
    UNSAFE_useAnalyticsContext?: boolean;
    /**
     * @default 100
     * @deprecated Use performanceTracking.transactionTracking instead https://product-fabric.atlassian.net/browse/ED-8985
     */
    transactionTracking?: TransactionTracking;
    /**
     * @description Control performance metric measurements and tracking
     */
    performanceTracking?: PerformanceTracking;
    elementBrowser?: {
        showModal?: boolean;
        replacePlusMenu?: boolean;
    };
    codeBlock?: CodeBlockOptions;
}
export {};
