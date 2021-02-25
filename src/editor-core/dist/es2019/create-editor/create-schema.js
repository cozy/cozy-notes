import { sortByOrder } from './sort-by-order';
import { Schema } from 'prosemirror-model';
import { sanitizeNodes } from '@atlaskit/adf-schema';
import { fixExcludes } from './create-editor';
export function createSchema(editorConfig) {
  const marks = fixExcludes(editorConfig.marks.sort(sortByOrder('marks')).reduce((acc, mark) => {
    acc[mark.name] = mark.mark;
    return acc;
  }, {}));
  const nodes = sanitizeNodes(editorConfig.nodes.sort(sortByOrder('nodes')).reduce((acc, node) => {
    acc[node.name] = node.node;
    return acc;
  }, {}), marks);
  return new Schema({
    nodes,
    marks
  });
}