import { InjectedIntl } from 'react-intl';
import { QuickInsertItem, QuickInsertProvider } from '@atlaskit/editor-common/provider-factory';
export type { QuickInsertActionInsert, QuickInsertItem, QuickInsertProvider, } from '@atlaskit/editor-common/provider-factory';
export declare type QuickInsertOptions = boolean | {
    provider: Promise<QuickInsertProvider>;
};
export declare type QuickInsertHandler = Array<QuickInsertItem> | ((intl: InjectedIntl) => Array<QuickInsertItem>);
export declare type IconProps = {
    label?: string;
};
export declare type QuickInsertPluginState = {
    isElementBrowserModalOpen: boolean;
    lazyDefaultItems: () => QuickInsertItem[];
    providedItems?: QuickInsertItem[];
    provider?: QuickInsertProvider;
};
export interface QuickInsertPluginOptions {
    headless?: boolean;
    disableDefaultItems?: boolean;
    enableElementBrowser?: boolean;
}
