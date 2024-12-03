import IsPublicContext from 'components/IsPublicContext'
import { getParentFolderLink } from 'lib/utils'
import { useMemo, useContext } from 'react'

function useReturnUrl({ returnUrl, cozyClient, doc }) {
  const isPublic = useContext(IsPublicContext)

  return useMemo(() => {
    if (returnUrl) {
      return returnUrl
    } else if (doc) {
      return getParentFolderLink(cozyClient, doc.file)
    } else if (!isPublic) {
      return '/'
    } else {
      return undefined
    }
  }, [returnUrl, doc, isPublic, cozyClient])
}

export default useReturnUrl
