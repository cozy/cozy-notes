import { CollabParticipant } from './types';
export interface ReadOnlyParticipants {
    get(sessionId: string): CollabParticipant | undefined;
    toArray(): ReadonlyArray<CollabParticipant>;
    eq(other: ReadOnlyParticipants): boolean;
}
export declare class Participants implements ReadOnlyParticipants {
    private participants;
    constructor(participants?: Map<string, CollabParticipant>);
    add(data: CollabParticipant[]): Participants;
    remove(sessionIds: string[]): Participants;
    update(sessionId: string, lastActive: number): Participants;
    toArray(): CollabParticipant[];
    get(sessionId: string): CollabParticipant | undefined;
    size(): number;
    eq(other: Participants): boolean;
}
