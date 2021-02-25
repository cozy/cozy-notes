import { EmojiId } from '@atlaskit/emoji';
import { Command } from '../../../types';
import { INPUT_METHOD } from '../../analytics';
export declare function insertEmoji(emojiId: EmojiId, inputMethod?: INPUT_METHOD.PICKER | INPUT_METHOD.ASCII | INPUT_METHOD.TYPEAHEAD): Command;
