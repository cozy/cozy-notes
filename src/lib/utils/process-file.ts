export const processFile = (
  file: string | null | ArrayBuffer
): false | ArrayBuffer =>
  file === null || typeof file === 'string' ? false : file
