import { toggleBlockMark, changeImageAlignment } from '../../../commands';
import { cascadeCommands } from '../../../utils/action';
export const isAlignable = align => (state, dispatch) => {
  const {
    nodes: {
      paragraph,
      heading
    },
    marks: {
      alignment
    }
  } = state.schema;
  return toggleBlockMark(alignment, () => !align ? undefined : align === 'start' ? false : {
    align
  }, [paragraph, heading])(state, dispatch);
};
export const changeAlignment = align => (state, dispatch) => {
  const {
    nodes: {
      paragraph,
      heading
    },
    marks: {
      alignment
    }
  } = state.schema;
  return cascadeCommands([changeImageAlignment(align), toggleBlockMark(alignment, () => !align ? undefined : align === 'start' ? false : {
    align
  }, [paragraph, heading])])(state, dispatch);
};