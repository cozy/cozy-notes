import React from 'react';
const EditorContentContext = /*#__PURE__*/React.createContext(() => {});
const EditorContentProvider = EditorContentContext.Provider;
/**
 * ProseMirror View mount point.
 */

const EditorContent = /*#__PURE__*/React.memo(() => {
  const handleRef = React.useContext(EditorContentContext);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%'
    },
    ref: handleRef
  });
});
export { EditorContentProvider, EditorContent };