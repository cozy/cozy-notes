export declare function getColumnCount(clientWidth: number): number;
declare type DatumReturnType = {
    availableWidth: number;
    columnCount: number;
};
declare type Options = {
    gutterSize: number;
    scrollbarWidth: number;
};
export declare function generateVirtualizedContainerDatum(containerWidth: number, options: Options): DatumReturnType;
export {};
