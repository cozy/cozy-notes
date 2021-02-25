import React from 'react';
import { ReadOnlyParticipants } from '../participants';
export interface AvatarsProps {
    sessionId?: string;
    participants: ReadOnlyParticipants;
}
export declare const Avatars: React.StatelessComponent<AvatarsProps>;
