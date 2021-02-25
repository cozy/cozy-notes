import { MarkSpec } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { ErrorReporter, ErrorReportingHandler } from '@atlaskit/editor-common';
import { EditorConfig, EditorPlugin, PMPluginCreateConfig } from '../types';
export declare function sortByRank(a: {
    rank: number;
}, b: {
    rank: number;
}): number;
export declare function fixExcludes(marks: {
    [key: string]: MarkSpec;
}): {
    [key: string]: MarkSpec;
};
export declare function processPluginsList(plugins: EditorPlugin[]): EditorConfig;
export declare function createPMPlugins(config: PMPluginCreateConfig): Plugin[];
export declare function createErrorReporter(errorReporterHandler?: ErrorReportingHandler): ErrorReporter;
