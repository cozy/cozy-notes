export const shallowEquals = ([aRaw], [bRaw]) => {
  const a = aRaw;
  const b = bRaw;
  return !Object.keys(a).some(key => {
    const k = key;
    return a[k] !== b[k];
  });
};