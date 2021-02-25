import { PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
/**
 * Plugin to scroll the user's selection into view whenever the user updates
 * the document eg. inserting, deleting, formatting
 *
 * Behaviour is on by default, can be explicitly opted out of for a transaction by
 * setting scrollIntoView=false meta
 * We ignore collab transactions, appended transactions, transactions without steps,
 * transactions with addToHistory=false meta and typeahead trigger transactions
 */
export declare const scrollIntoViewPluginKey: PluginKey<any, any>;
declare const scrollIntoViewPlugin: () => EditorPlugin;
export default scrollIntoViewPlugin;
