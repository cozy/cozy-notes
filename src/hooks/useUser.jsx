import IsPublicContext from 'components/IsPublicContext'
import { getShortNameFromClient, getUserNameFromUrl } from 'lib/utils'
import { useMemo, useContext } from 'react'

import { useClient } from 'cozy-client'

function useUser() {
  const client = useClient()
  const isPublic = useContext(IsPublicContext)
  const userName = useMemo(
    () =>
      getUserNameFromUrl() || (isPublic ? '?' : getShortNameFromClient(client)),
    [client, isPublic]
  )
  const userId = userName
  return { userId, userName }
}

export default useUser
