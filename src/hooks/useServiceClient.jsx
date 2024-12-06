import ServiceClient from 'lib/collab/stack-client'
import { useMemo } from 'react'

function useServiceClient({ userId, userName, cozyClient }) {
  return useMemo(() => {
    return new ServiceClient({ userId, userName, cozyClient })
  }, [cozyClient, userId, userName])
}

export default useServiceClient
