import { BRACKET_MAP } from './bracket-handling';
import { QUOTE_MAP } from './quote-handling';
const PAIRED_CHARACTER_MAP = { ...BRACKET_MAP,
  ...QUOTE_MAP
};
export const isCursorBeforeClosingCharacter = after => {
  return Object.keys(PAIRED_CHARACTER_MAP).some(leftCharacter => after.startsWith(PAIRED_CHARACTER_MAP[leftCharacter]));
};
export const isClosingCharacter = text => {
  return Object.keys(PAIRED_CHARACTER_MAP).some(leftCharacter => text === PAIRED_CHARACTER_MAP[leftCharacter]);
};