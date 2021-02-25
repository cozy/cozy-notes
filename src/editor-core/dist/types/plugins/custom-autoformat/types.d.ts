import { Node as ProsemirrorNode } from 'prosemirror-model';
export type { AutoformatHandler, AutoformatReplacement, AutoformattingProvider, AutoformatRuleset as Ruleset, } from '@atlaskit/editor-common/provider-factory';
export declare type AutoformatCandidate = {
    start: number;
    end: number;
    match: string[];
};
export declare type AutoformatMatch = {
    matchString: string;
    replacement?: ProsemirrorNode;
};
export declare type CustomAutoformatState = {
    resolving: Array<AutoformatCandidate>;
    matches: Array<AutoformatMatch>;
};
export declare type CustomAutoformatMatched = {
    action: 'matched';
    start: number;
    end: number;
    match: string[];
};
export declare type CustomAutoformatResolved = {
    action: 'resolved';
    matchString: string;
    replacement?: ProsemirrorNode;
};
export declare type CustomAutoformatFinish = {
    action: 'finish';
    matchString: string;
};
export declare type CustomAutoformatAction = CustomAutoformatMatched | CustomAutoformatResolved | CustomAutoformatFinish;
