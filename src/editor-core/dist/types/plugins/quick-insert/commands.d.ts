import { QuickInsertItem } from '@atlaskit/editor-common/src/provider-factory/quick-insert-provider';
import { Command } from '../../types';
export declare const openElementBrowserModal: () => Command;
export declare const closeElementBrowserModal: () => Command;
export declare const insertItem: (item: QuickInsertItem) => Command;
