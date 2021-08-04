import { useMemo, useContext } from 'react'
import IsPublicContext from 'components/IsPublicContext'
import { getShortNameFromClient, getUserNameFromUrl } from 'lib/utils'

function useUser({ userName: providedUserName, cozyClient }) {
  const isPublic = useContext(IsPublicContext)
  const userName = useMemo(
    () =>
      providedUserName ||
      getUserNameFromUrl() ||
      (isPublic ? '?' : getShortNameFromClient(cozyClient)),
    [cozyClient, providedUserName, isPublic]
  )
  const userId = userName
  return { userId, userName }
}

export default useUser
