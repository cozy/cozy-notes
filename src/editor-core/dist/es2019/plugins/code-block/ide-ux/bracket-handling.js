export const BRACKET_MAP = {
  '{': '}',
  '[': ']',
  '(': ')'
};
export const shouldAutoCloseBracket = (before, after) => {
  // when directly before a closing bracket
  if (/^[}\])]/.test(after)) {
    return true;
  } // exclusion: when directly before a non-whitespace character


  if (/^[^\s]/.test(after)) {
    return false;
  }

  return true;
};
export const getAutoClosingBracketInfo = (before, after) => {
  const left = Object.keys(BRACKET_MAP).find(item => before.endsWith(item));
  const right = left ? BRACKET_MAP[left] : undefined;
  const hasTrailingMatchingBracket = right ? after.startsWith(right) : false;
  return {
    left,
    right,
    hasTrailingMatchingBracket
  };
};