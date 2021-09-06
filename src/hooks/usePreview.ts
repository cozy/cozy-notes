import { SHARING_LOCATION } from 'constants/strings'
import { getPublicSharecode } from 'lib/initFromDom'
import { useState, useEffect } from 'react'

export const usePreview = (pathname: string): boolean => {
  const [shouldDisplay, setDisplay] = useState(false)

  useEffect(() => {
    setDisplay(SHARING_LOCATION === pathname && !!getPublicSharecode())
  }, [pathname])

  return shouldDisplay
}
