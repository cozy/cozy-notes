import React, { useMemo } from 'react'

import { getDriveLink } from 'lib/utils'
import { Breakpoints } from 'types/enums'
import { NotePath } from './notes/List/NotePath'
import { WithBreakpoints } from './notes/List/WithBreakpoints'
import { useClient } from 'cozy-client'
import useFileWithPath from 'hooks/useFileWithPath'

export const HeaderNotePath = ({ file }) => {
  const client = useClient()
  const fileWithPath = useFileWithPath({ cozyClient: client, file })
  const drivePath = useMemo(() => getDriveLink(client, file.attributes.dirId), [
    client,
    file.attributes.dirId
  ])

  return (
    <WithBreakpoints hideOn={Breakpoints.Mobile}>
      {fileWithPath ? (
        <NotePath
          drivePath={drivePath}
          path={fileWithPath.path}
          target="_blank"
        />
      ) : null}
    </WithBreakpoints>
  )
}
