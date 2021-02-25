import { Slice } from 'prosemirror-model';
import { Step } from 'prosemirror-transform';
export declare const stepHasSlice: (step: Step) => step is Step<any> & {
    from: number;
    to: number;
    slice: Slice;
};
