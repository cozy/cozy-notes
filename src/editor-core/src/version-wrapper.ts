export const name = '@atlaskit/editor-core'
export const version = '999.9.9'
export const nextMajorVersion = () => {
  return [Number(version.split('.')[0]) + 1, 0, 0].join('.');
};
