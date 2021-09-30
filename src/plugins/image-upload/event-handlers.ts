window.document.addEventListener(
  'dragover',
  event => (
    event.preventDefault(),
    !(<HTMLElement>event?.target).closest('.ProseMirror') &&
      event.dataTransfer !== null &&
      (event.dataTransfer.dropEffect = 'none')
  )
)

export {}
