import 'url-search-params-polyfill'

export const getDataset = function() {
  const root = document.querySelector('[role=application]')
  return JSON.parse(root.dataset.cozy)
}

// return a defaultData if the template hasn't been replaced by cozy-stack
export const getDataOrDefault = function(toTest, defaultData) {
  const templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/ // {{.Example}}
  return templateRegex.test(toTest) ? defaultData : toTest
}

export const getPublicSharecode = function() {
  const search = new URLSearchParams(window.location.search)
  return search.get('sharecode')
}
