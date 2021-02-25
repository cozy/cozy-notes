export interface ExpandPluginState {
    expandRef?: HTMLDivElement | null;
}
export declare type ExpandPluginAction = {
    type: 'SET_EXPAND_REF';
    data: {
        ref?: HTMLDivElement | null;
    };
};
