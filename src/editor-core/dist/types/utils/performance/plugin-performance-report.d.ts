export interface PluginMethodReport {
    stateApply: number;
    viewUpdate: number;
    onEditorViewStateUpdated: number;
}
export interface OutlierReport {
    stateApplyOutlier: number | undefined;
    viewUpdateOutlier: number | undefined;
}
export interface PluginsReport {
    [name: string]: PluginMethodReport;
}
export interface PluginPerformanceReportData {
    trigger: string;
    duration: number;
    nodes: {
        [name: string]: number;
    };
    plugins: PluginsReport;
    slowPlugins: PluginsReport;
    stepDurations: {
        stateApply: number;
        viewUpdate: number;
        onChange: number;
        onEditorViewStateUpdated: number;
        countNodes: number;
    };
}
export interface PluginPerformanceReportOptions {
    samplingRate: number;
    slowThreshold: number;
    outlierThreshold: number;
    outlierFactor: number;
}
export declare class PluginPerformanceReport {
    private entry;
    private count;
    private pluginNames;
    private entryList?;
    private stateApplied?;
    private viewUpdated?;
    private onChangeCalled?;
    private onEditorViewStateUpdatedCalled?;
    private nodes;
    private nodesDuration;
    private plugins;
    private slowPlugins;
    private options;
    private constructor();
    static fromEntry(entry: PerformanceEntry): PluginPerformanceReport;
    private isChild;
    private getEntryByName;
    private getMethodSum;
    private greaterEquals;
    private hasOutlierMethods;
    get trigger(): 'none' | 'slow' | 'distribution' | 'sample';
    get hasSlowPlugins(): boolean;
    withEntryList(entryList: PerformanceObserverEntryList): this;
    withPlugins(pluginNames: string[]): this;
    withNodes(nodes: {
        [name: string]: number;
    }, nodesDuration?: number): this;
    withCount(count: number): this;
    withOptions(options: Partial<PluginPerformanceReportOptions>): this;
    toJSON(): PluginPerformanceReportData;
}
