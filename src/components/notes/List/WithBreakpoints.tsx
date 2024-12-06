import React from 'react'
import { Breakpoints } from 'types/enums'

import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

interface Props {
  hideOn?: Breakpoints
  showOn?: Breakpoints
}

export const WithBreakpoints: React.FC<Props> = ({
  hideOn,
  showOn,
  children
}) => {
  const breakpoints = useBreakpoints()
  const hidden = hideOn && breakpoints[hideOn]
  const shown = showOn && breakpoints[showOn]
  const Component = <>{children}</>

  return hideOn
    ? hidden
      ? null
      : Component
    : showOn
    ? shown
      ? Component
      : null
    : Component
}
