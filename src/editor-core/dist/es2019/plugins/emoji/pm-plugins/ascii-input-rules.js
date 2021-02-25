import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { PluginKey } from 'prosemirror-state';
import { createInputRule, instrumentedInputRule, leafNodeReplacementCharacter } from '../../../utils/input-rules';
import { isMarkTypeAllowedInCurrentSelection } from '../../../utils';
import { addAnalytics, ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID, INPUT_METHOD, EVENT_TYPE } from '../../analytics';
let matcher;
export function inputRulePlugin(schema, providerFactory) {
  if (schema.nodes.emoji && providerFactory) {
    initMatcher(providerFactory);
    const asciiEmojiRule = createInputRule(AsciiEmojiMatcher.REGEX, inputRuleHandler);
    return instrumentedInputRule('emoji', {
      rules: [asciiEmojiRule]
    });
  }

  return;
}

function initMatcher(providerFactory) {
  const handleProvider = (_name, provider) => {
    if (!provider) {
      return;
    }

    provider.then(emojiProvider => {
      emojiProvider.getAsciiMap().then(map => {
        matcher = new RecordingAsciiEmojiMatcher(emojiProvider, map);
      });
    });
  };

  providerFactory.subscribe('emojiProvider', handleProvider);
}

function inputRuleHandler(state, matchParts, start, end) {
  if (!matcher) {
    return null;
  }

  if (!isEnabled(state)) {
    return null;
  }

  const match = matcher.match(matchParts);

  if (match) {
    const transactionCreator = new AsciiEmojiTransactionCreator(state, match, start, end);
    return transactionCreator.create();
  }

  return null;
}

function isEnabled(state) {
  const typeAheadQuery = state.schema.marks.typeAheadQuery;
  const isTypeAheadQueryActive = state.selection.$from.marks().some(mark => mark.type === typeAheadQuery);
  return isTypeAheadQueryActive || isMarkTypeAllowedInCurrentSelection(typeAheadQuery, state);
}

const REGEX_LEADING_CAPTURE_INDEX = 1;
const REGEX_EMOJI_LEADING_PARENTHESES = 2;
const REGEX_EMOJI_ASCII_CAPTURE_INDEX = 3;
const REGEX_TRAILING_CAPTURE_INDEX = 4;

const getLeadingString = (match, withParenthesis = true) => match[REGEX_LEADING_CAPTURE_INDEX] + (withParenthesis ? match[REGEX_EMOJI_LEADING_PARENTHESES] : '');

const getLeadingStringWithoutParentheses = match => getLeadingString(match, false);

const getAscii = (match, withParentheses = false) => (withParentheses ? match[REGEX_EMOJI_LEADING_PARENTHESES] : '') + match[REGEX_EMOJI_ASCII_CAPTURE_INDEX].trim();

const getAsciiWithParentheses = matchParts => getAscii(matchParts, true);

const getTrailingString = match => match[REGEX_TRAILING_CAPTURE_INDEX] || '';

class AsciiEmojiMatcher {
  /**
   * This regex matches 2 scenarios:
   * 1. an emoticon starting with a colon character (e.g. :D => 😃)
   * 2. an emoticon not starting with a colon character (e.g. 8-D => 😎)
   *
   * Explanation (${leafNodeReplacementCharacter} is replaced with character \ufffc)
   *
   *  1st Capturing Group ((?:^|[\s\ufffc])(?:\(*?))
   *    Non-capturing group (?:^|[\s\ufffc])
   *      1st Alternative ^
   *        ^ asserts position at start of the string
   *      2nd Alternative [\s\ufffc]
   *        matches a single character present in [\s\ufffc]
   *    Non-capturing group (?:\(*?)
   *      matches the character ( literally between zero and unlimited times, as few times as possible, expanding as needed (lazy)
   *  2nd Capturing Group (\(?)
   *    matches a single ( if present
   *  3rd Capturing Group ([^:\s\ufffc\(]\S{1,3}|:\S{1,3}( ))
   *    1st Alternative [^:\s\ufffc\(]\S{1,3}
   *      matches a single character not present in [^:\s\ufffc\(] between 1 and 3 times, as many times as possible, giving back as needed (greedy)
   *    2nd Alternative :\S{1,3}( )
   *      : matches the character : literally
   *      \S{1,3} matches any non-whitespace character between 1 and 3 times, as many times as possible, giving back as needed (greedy)
   *  4th Capturing Group ( )
   *
   * See https://regex101.com/r/HRS9O2/4
   */
  constructor(asciiToEmojiMap) {
    this.asciiToEmojiMap = asciiToEmojiMap;
  }

  match(matchParts) {
    return this.getAsciiEmojiMatch(getLeadingStringWithoutParentheses(matchParts), getAsciiWithParentheses(matchParts), getTrailingString(matchParts)) || this.getAsciiEmojiMatch(getLeadingString(matchParts), getAscii(matchParts), getTrailingString(matchParts));
  }

  getAsciiEmojiMatch(leading, ascii, trailing) {
    const emoji = this.asciiToEmojiMap.get(ascii);
    return emoji ? {
      emoji,
      leadingString: leading,
      trailingString: trailing
    } : undefined;
  }

}
/**
 * A matcher that will record ascii matches as usages of the matched emoji.
 */


_defineProperty(AsciiEmojiMatcher, "REGEX", new RegExp(`((?:^|[\\s${leafNodeReplacementCharacter}])(?:\\(*?))(\\(?)([^:\\s${leafNodeReplacementCharacter}\\(]\\S{1,3}|:\\S{1,3}( ))$`));

class RecordingAsciiEmojiMatcher extends AsciiEmojiMatcher {
  constructor(emojiProvider, asciiToEmojiMap) {
    super(asciiToEmojiMap);
    this.emojiProvider = emojiProvider;
  }

  match(matchParts) {
    const match = super.match(matchParts);

    if (match && this.emojiProvider.recordSelection) {
      this.emojiProvider.recordSelection(match.emoji);
    }

    return match;
  }

}

class AsciiEmojiTransactionCreator {
  constructor(state, match, start, end) {
    this.state = state;
    this.match = match;
    this.start = start;
    this.end = end;
  }

  create() {
    const tr = this.state.tr.replaceWith(this.from, this.to, this.createNodes());
    return addAnalytics(this.state, tr, {
      action: ACTION.INSERTED,
      actionSubject: ACTION_SUBJECT.DOCUMENT,
      actionSubjectId: ACTION_SUBJECT_ID.EMOJI,
      attributes: {
        inputMethod: INPUT_METHOD.ASCII
      },
      eventType: EVENT_TYPE.TRACK
    });
  }

  get from() {
    return this.start + this.match.leadingString.length;
  }

  get to() {
    return this.end;
  }

  createNodes() {
    const nodes = [this.createEmojiNode()];

    if (this.trailingTextNodeRequired()) {
      nodes.push(this.createTrailingTextNode());
    }

    return nodes;
  }

  createEmojiNode() {
    const {
      emoji: emojiTypeNode
    } = this.state.schema.nodes;
    return emojiTypeNode.create(this.getEmojiNodeAttrs());
  }

  getEmojiNodeAttrs() {
    const emoji = this.match.emoji;
    return {
      id: emoji.id,
      shortName: emoji.shortName,
      text: emoji.fallback || emoji.shortName
    };
  }

  trailingTextNodeRequired() {
    return this.match.trailingString.length > 0;
  }

  createTrailingTextNode() {
    return this.state.schema.text(this.match.trailingString);
  }

}

export const stateKey = new PluginKey('asciiEmojiPlugin');

const plugins = (schema, providerFactory) => {
  return [inputRulePlugin(schema, providerFactory)].filter(plugin => !!plugin);
};

export default plugins;