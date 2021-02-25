import { Plugin } from 'prosemirror-state';
import { DispatchAnalyticsEvent } from '../../analytics';
import { InputTracking, BFreezeTracking } from '../../../types/performance-tracking';
export declare const DEFAULT_FREEZE_THRESHOLD = 600;
export declare const NORMAL_SEVERITY_THRESHOLD = 2000;
export declare const DEGRADED_SEVERITY_THRESHOLD = 3000;
declare const _default: (dispatchAnalyticsEvent: DispatchAnalyticsEvent, inputTracking?: InputTracking | undefined, browserFreezeTracking?: BFreezeTracking | undefined) => Plugin<any, any>;
export default _default;
