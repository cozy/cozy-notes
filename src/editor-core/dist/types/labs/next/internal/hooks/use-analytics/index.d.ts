import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { EditorSharedConfig } from '../../../internal/context/shared-config';
/**
 * Subscribes to analytics events fired from editor components
 * and passes them through to `fireAnalyticsEvent`.
 */
export declare function useAnalyticsHandler(editorSharedConfig: EditorSharedConfig | null): void;
export declare function useCreateAnalyticsHandler(createAnalyticsEvent?: CreateUIAnalyticsEvent): import("../../../../../plugins/analytics").FireAnalyticsCallback;
