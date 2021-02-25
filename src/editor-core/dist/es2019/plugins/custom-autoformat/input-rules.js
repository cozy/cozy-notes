const MAX_MATCH = 500; // this is a modified version of
// https://github.com/ProseMirror/prosemirror-inputrules/blob/master/src/inputrules.js#L53

export const triggerInputRule = (view, rules, from, to, text) => {
  const {
    state
  } = view;
  const $from = state.doc.resolve(from);

  if ($from.parent.type.spec.code) {
    return false;
  }

  let textBefore = $from.parent.textBetween(Math.max(0, $from.parentOffset - MAX_MATCH), $from.parentOffset, undefined, '\ufffc') + text; // loop through rules trying to find one that matches

  for (let i = 0; i < rules.length; i++) {
    let match;

    if (text.length) {
      match = rules[i].matchTyping.exec(textBefore);
    } else {
      match = rules[i].matchEnter.exec(textBefore);
    }

    if (match) {
      // kick off the handler
      const pos = from - (match[0].length - text.length);
      rules[i].handler(view, match, pos, to);
      return true;
    }
  }

  return false;
};