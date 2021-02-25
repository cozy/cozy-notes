import { CardProvider } from '@atlaskit/editor-common/provider-factory';
import { EditorView } from 'prosemirror-view';
import { OutstandingRequests, Request } from '../../types';
export declare const resolveWithProvider: (view: EditorView, outstandingRequests: OutstandingRequests, provider: CardProvider, request: Request) => Promise<void | import("@atlaskit/smart-card").InlineCardAdf | import("@atlaskit/smart-card").BlockCardAdf | import("@atlaskit/smart-card").EmbedCardAdf>;
export declare const handleProvider: (_: 'cardProvider', provider: Promise<CardProvider> | undefined, view: EditorView) => void;
