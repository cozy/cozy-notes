import { QuickInsertItem } from '@atlaskit/editor-common/src/provider-factory/quick-insert-provider';
import { QuickInsertPluginState, QuickInsertPluginOptions } from './types';
export declare function find(query: string, items: QuickInsertItem[]): QuickInsertItem[];
export declare const searchQuickInsertItems: (quickInsertState: QuickInsertPluginState, options?: QuickInsertPluginOptions | undefined) => (query?: string | undefined, category?: string | undefined) => QuickInsertItem[];
export declare const getFeaturedQuickInsertItems: ({ providedItems, lazyDefaultItems }: QuickInsertPluginState, options?: QuickInsertPluginOptions | undefined) => () => QuickInsertItem[];
