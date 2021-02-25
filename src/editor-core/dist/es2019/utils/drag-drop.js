export function isDroppedFile(rawEvent) {
  const e = rawEvent;

  if (!e.dataTransfer) {
    return false;
  }

  return Array.prototype.slice.call(e.dataTransfer.types).indexOf('Files') !== -1;
}