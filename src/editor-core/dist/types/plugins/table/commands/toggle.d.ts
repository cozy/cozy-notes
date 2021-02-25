import { TableLayout } from '@atlaskit/adf-schema';
import { Command } from '../../../types';
/**
 * Table layout toggle logic
 * default -> wide -> full-width -> default
 */
export declare const getNextLayout: (currentLayout: TableLayout) => TableLayout;
export declare const toggleHeaderRow: Command;
export declare const toggleHeaderColumn: Command;
export declare const toggleNumberColumn: Command;
export declare const toggleTableLayout: Command;
export declare const toggleContextualMenu: () => Command;
