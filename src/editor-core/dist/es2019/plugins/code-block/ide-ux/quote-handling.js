export const QUOTE_MAP = {
  "'": "'",
  '"': '"',
  '`': '`'
};
export const shouldAutoCloseQuote = (before, after) => {
  // when directly before a closing bracket
  if (/^[}\])]/.test(after)) {
    return true;
  } // exclusion: when directly before a non-whitespace character


  if (/^[^\s]/.test(after)) {
    return false;
  } // exclusion: when directly after a letter or quote


  if (/[A-Za-z0-9]$/.test(before) || /[\'\"\`]$/.test(before)) {
    return false;
  }

  return true;
};
export const getAutoClosingQuoteInfo = (before, after) => {
  const left = Object.keys(QUOTE_MAP).find(item => before.endsWith(item));
  const right = left ? QUOTE_MAP[left] : undefined;
  const hasTrailingMatchingQuote = right ? after.startsWith(right) : false;
  return {
    left,
    right,
    hasTrailingMatchingQuote
  };
};