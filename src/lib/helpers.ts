export const processFile = (
  file: string | null | ArrayBuffer
): false | ArrayBuffer =>
  file === null || typeof file === 'string' ? false : file

export const removeFilename = (path: string): string =>
  /(.+)(\/.+)$/.exec(path)?.[1] || path
