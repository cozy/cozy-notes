import { InjectedIntl } from 'react-intl';
import { UIAnalyticsEventHandler } from '@atlaskit/analytics-next';
export declare type EditorReactContext = {
    getAtlaskitAnalyticsEventHandlers: () => UIAnalyticsEventHandler[];
    intl: InjectedIntl;
};
