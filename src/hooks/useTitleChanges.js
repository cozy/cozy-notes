import { useMemo, useEffect, useCallback } from 'react'
import { getAppFullName } from 'lib/utils'

function useTitleChanges({ noteId, title, setTitle, serviceClient }) {
  // Title change because of a local change from the editor
  const onLocalTitleChange = useCallback(
    serviceClient
      ? e => {
          // Let the user tab out of the title when using the 'Enter' key
          if (e.nativeEvent?.inputType === 'insertLineBreak')
            return window.dispatchEvent(
              new KeyboardEvent('keydown', { key: 9 })
            )

          // forbid line feed and non standard spaces in title
          const modifiedTitle = e.target.value.replace(/[\r\t\n\xa0]+/g, ' ')
          if (title != modifiedTitle) {
            setTitle(modifiedTitle)
            serviceClient.setTitle(noteId, modifiedTitle)
          }
        }
      : () => {},
    [noteId, title, setTitle, serviceClient]
  )
  // Title change because of a remote change from the stack
  useEffect(() => {
    serviceClient &&
      serviceClient.onTitleUpdated(noteId, modifiedTitle => {
        if (title != modifiedTitle) {
          setTitle(modifiedTitle)
        }
      })
  }, [title, setTitle, serviceClient, noteId])
  // whatever the change is, keep the tab title updated
  const appFullName = useMemo(getAppFullName, [])
  useEffect(() => {
    document.title =
      title && title != '' ? `${title} - ${appFullName}` : appFullName
  }, [appFullName, title])
  return { onLocalTitleChange }
}

export default useTitleChanges
