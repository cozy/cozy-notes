export const imageUploadHandler = (e, fn) => {
  window.document.querySelector(['[data-file-input]']).click()
  fn()
}

// if you change something here,
// you should update /lib/collab/schema.js
// otherwise the server part won't work
const editorConfig = {
  allowBreakout: true,
  allowTextColor: true,
  allowTextAlignment: true,
  allowIndentation: true,
  allowTables: {
    allowColumnSorting: true,
    allowColumnResizing: true,
    allowMergeCells: true,
    allowNumberColumn: true,
    allowBackgroundColor: true,
    allowHeaderRow: true,
    allowHeaderColumn: true,
    permittedLayouts: 'all',
    stickToolbarToBottom: true
  },
  allowPanel: true,
  allowStatus: true,
  allowRule: true,
  //allowDate: true,

  cozyImage: true
}

export default editorConfig
