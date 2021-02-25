import { ReplaceStep } from 'prosemirror-transform';
export const isTextInput = tr => {
  const [step] = tr.steps;

  if (!step || !(step instanceof ReplaceStep)) {
    return false;
  }

  const {
    slice: {
      content
    },
    from,
    to
  } = step;
  const char = content.firstChild;
  return from === to && content.childCount === 1 && !!char && !!char.text && char.text.length === 1;
};