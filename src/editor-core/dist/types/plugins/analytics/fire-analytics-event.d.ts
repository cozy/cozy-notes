import { AnalyticsEventPayload } from './types';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
export declare type FireAnalyticsCallback = ({ payload, channel, }: {
    payload: AnalyticsEventPayload;
    channel?: string | undefined;
}) => void | undefined;
export declare type FireAnalyticsEvent = (createAnalyticsEvent?: CreateUIAnalyticsEvent | undefined) => FireAnalyticsCallback;
export declare const fireAnalyticsEvent: FireAnalyticsEvent;
