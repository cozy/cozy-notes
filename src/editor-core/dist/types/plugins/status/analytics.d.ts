import { AnalyticsEventPayload, CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
export declare const FABRIC_CHANNEL = "fabric-elements";
export declare const createStatusAnalyticsAndFire: (createAnalyticsEvent?: CreateUIAnalyticsEvent | undefined) => (payload: AnalyticsEventPayload) => void;
export declare const analyticsState: (isNew: boolean | undefined) => "update" | "new";
