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

export const getToken = function(dataset) {
  if (
    dataset &&
    dataset.cozyToken &&
    dataset.cozyToken.length > 0 &&
    dataset.cozyToken[0] != '{'
  ) {
    return { isPublic: false, token: dataset.cozyToken }
  } else {
    const { sharecode } = window.location.search
      .substring(1)
      .split('&')
      .map(varval => varval.split('='))
      .reduce(arrToObj, {})
    return { isPublic: true, token: sharecode }
  }
}
