export const imageUploadHandler = (e, fn) => {
  // ED-3294: we cannot insert base64 images so we just simulate inserting an image
  console.error('fn', fn)
  console.error('e', e)
  //const imageUrl = prompt('Enter the image URL to insert:')
  //if (imageUrl) {
  fn()
  //}
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
  allowRule: true
  //cozyImage: true
}

export default editorConfig
