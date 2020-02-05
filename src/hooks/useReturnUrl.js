import { useMemo, useContext } from 'react'
import IsPublicContext from 'components/IsPublicContext'
import { getParentFolderLink } from 'lib/utils.js'

function useReturnUrl({ returnUrl, cozyClient, doc }) {
  const isPublic = useContext(IsPublicContext)

  return useMemo(
    () => {
      if (returnUrl !== undefined) {
        return returnUrl
      } else if (doc) {
        return getParentFolderLink(cozyClient, doc.file)
      } else if (!isPublic) {
        return '/'
      } else {
        return undefined
      }
    },
    [returnUrl, doc, isPublic, cozyClient]
  )
}

export default useReturnUrl
