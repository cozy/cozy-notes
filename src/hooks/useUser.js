import { useMemo } from 'react'

import { getShortNameFromClient } from 'lib/utils.js'

function useUser({ userName: providedUserName, cozyClient }) {
  const userName = useMemo(
    () => providedUserName || getShortNameFromClient(cozyClient),
    [providedUserName]
  )
  const userId = userName
  return { userId, userName }
}

export default useUser
