import { useMemo, useEffect, useCallback } from 'react'
import { getAppFullName } from 'lib/utils.js'

function useTitleChanges({ noteId, title, setTitle, serviceClient }) {
  // Title change because of a local change from the editor
  const onLocalTitleChange = useCallback(
    serviceClient
      ? e => {
          const modifiedTitle = e.target.value
          if (title != modifiedTitle) {
            setTitle(modifiedTitle)
            serviceClient.setTitle(noteId, modifiedTitle)
          }
        }
      : () => {},
    [noteId, title, setTitle, serviceClient]
  )
  // Title change because of a remote change from the stack
  useEffect(
    () => {
      serviceClient &&
        serviceClient.onTitleUpdated(noteId, modifiedTitle => {
          if (title != modifiedTitle) {
            setTitle(modifiedTitle)
          }
        })
    },
    [title, setTitle, serviceClient, noteId]
  )
  // whatever the change is, keep the tab title updated
  const appFullName = useMemo(getAppFullName, [])
  useEffect(
    () => {
      document.title =
        title && title != '' ? `${title} - ${appFullName}` : appFullName
    },
    [appFullName, title]
  )
  return { onLocalTitleChange }
}

export default useTitleChanges
