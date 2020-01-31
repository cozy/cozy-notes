import { useMemo } from 'react'
import ServiceClient from 'lib/collab/stack-client'

function useServiceClient({ userId, userName, cozyClient }) {
  return useMemo(
    () => {
      return new ServiceClient({ userId, userName, cozyClient })
    },
    [cozyClient, userId, userName]
  )
}

export default useServiceClient
