export const getDataset = function() {
  const root = document.querySelector('[role=application]')
  return root.dataset
}

// return a defaultData if the template hasn't been replaced by cozy-stack
export const getDataOrDefault = function(toTest, defaultData) {
  const templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/ // {{.Example}}
  return templateRegex.test(toTest) ? defaultData : toTest
}
const arrToObj = (obj = {}, [key, val = true]) => {
  obj[key] = val
  return obj
}

export const getPublicSharecode = function() {
  const { sharecode } = window.location.search
    .substring(1)
    .split('&')
    .map(varval => varval.split('='))
    .reduce(arrToObj, {})
  return sharecode
}
