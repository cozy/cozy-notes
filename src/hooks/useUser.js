import { useMemo } from 'react'

import { getShortNameFromClient, getUserNameFromUrl } from 'lib/utils.js'

function useUser({ userName: providedUserName, cozyClient }) {
  const userName = useMemo(
    () =>
      providedUserName ||
      getUserNameFromUrl() ||
      getShortNameFromClient(cozyClient),
    [cozyClient, providedUserName]
  )
  const userId = userName
  return { userId, userName }
}

export default useUser
