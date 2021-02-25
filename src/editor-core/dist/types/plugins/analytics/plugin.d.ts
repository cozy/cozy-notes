import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { EditorPlugin } from '../../types/editor-plugin';
import { AnalyticsEventPayload } from './types';
import { UITracking, TransactionTracking, NodeViewTracking } from '../../types/performance-tracking';
interface AnalyticsPluginOptions {
    createAnalyticsEvent?: CreateUIAnalyticsEvent;
    performanceTracking?: {
        transactionTracking?: TransactionTracking;
        uiTracking?: UITracking;
        nodeViewTracking?: NodeViewTracking;
    };
}
declare const analyticsPlugin: (options: AnalyticsPluginOptions) => EditorPlugin;
export declare function extendPayload(payload: AnalyticsEventPayload, duration: number): AnalyticsEventPayload;
export default analyticsPlugin;
