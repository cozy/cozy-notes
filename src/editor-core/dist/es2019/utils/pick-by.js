const pickBy = (test, object) => Object.keys(object).reduce((obj, key) => test(String(key), object[key]) ? { ...obj,
  [key]: object[key]
} : obj, {});

export default pickBy;