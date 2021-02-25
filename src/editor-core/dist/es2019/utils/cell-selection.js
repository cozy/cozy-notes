export const cellSelectionNodesBetween = (selection, doc, f, startPos) => {
  selection.forEachCell((cell, cellPos) => {
    doc.nodesBetween(cellPos, cellPos + cell.nodeSize, f, startPos);
  });
};