import { Transaction } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { Participants, ReadOnlyParticipants } from './participants';
export declare const TELEPOINTER_DIM_CLASS = "telepointer-dim";
export declare class PluginState {
    private decorationSet;
    private participants;
    private onError;
    private sid?;
    isReady: boolean;
    get decorations(): DecorationSet<any>;
    get activeParticipants(): ReadOnlyParticipants;
    get sessionId(): string | undefined;
    constructor(decorations: DecorationSet, participants: Participants, sessionId?: string, collabInitalised?: boolean, onError?: (err: Error) => void);
    getInitial(sessionId: string): string;
    apply(tr: Transaction): PluginState;
    static eq(a: PluginState, b: PluginState): boolean;
    static init(config: any): PluginState;
}
