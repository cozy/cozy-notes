import { PluginPerformanceReportData, PluginPerformanceReportOptions } from './plugin-performance-report';
export declare class PluginPerformanceObserver implements PerformanceObserver {
    private callback;
    private getNodeCounts;
    private getPlugins;
    private getOptions;
    private reportCount;
    constructor(callback: (report: PluginPerformanceReportData) => void);
    withNodeCounts(getNodeCounts: () => {
        [name: string]: number;
    }): this;
    withPlugins(getPlugins: () => string[]): this;
    withOptions(getOptions: () => Partial<PluginPerformanceReportOptions>): this;
    private onObserveration;
    private observer;
    observe(): void;
    disconnect(): void;
    takeRecords(): PerformanceEntryList;
}
