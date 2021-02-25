import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { EmojiId } from '@atlaskit/emoji';
export declare type Props = {
    className?: string;
    view?: EditorView;
    idx?: number;
    providerFactory?: ProviderFactory;
    title?: string;
    onChange?: (emoji: EmojiId) => void;
    isSelected?: boolean;
};
export declare type State = {
    isPopupOpen?: Boolean;
    activeIcon?: string;
};
export declare const EmojiPickerButton: (props: Props) => JSX.Element;
