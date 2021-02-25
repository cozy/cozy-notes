/**
 * Create a new getAttrs handler who will wrap the original function,
 * and store the changes internally to be used for other
 * tools like Analytics later in the code.
 *
 * @param getAttrs - Function who gets the new attributes
 * @return object
 * @property handler - New handler to get indentation attributes (It wraps the original)
 * @property getChanges - Return all the stored changes.
 * @property clear - Clear the changes
 */
export default function getAttrsWithChangesRecorder(getAttrs, options) {
  let changes = [];

  function getAttrsWithChangesRecorder(prevAttrs, node) {
    const newAttrs = getAttrs(prevAttrs, node);
    changes.push({
      node: node,
      prevAttrs,
      newAttrs,
      options
    });
    return newAttrs;
  }

  return {
    getAttrs: getAttrsWithChangesRecorder,

    getAndResetAttrsChanges() {
      const oldChanges = changes;
      changes = [];
      return oldChanges;
    }

  };
}