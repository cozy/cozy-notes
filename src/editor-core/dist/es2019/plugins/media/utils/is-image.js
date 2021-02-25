export const isImage = fileType => {
  return !!fileType && (fileType.indexOf('image/') > -1 || fileType.indexOf('video/') > -1);
};