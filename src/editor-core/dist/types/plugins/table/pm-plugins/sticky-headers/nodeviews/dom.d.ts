export declare type TableDOMElements = {
    wrapper: HTMLDivElement;
    table: HTMLTableElement;
};
export declare const getTree: (tr: HTMLTableRowElement) => TableDOMElements | null;
export declare const getTop: (element: HTMLElement | Window | undefined) => number;
