import { buildFileByIdQuery } from 'lib/queries'
import { getDriveLink } from 'lib/utils'
import React, { useMemo } from 'react'
import { Breakpoints } from 'types/enums'

import { useClient, useQuery } from 'cozy-client'
import { ensureFilePath } from 'cozy-client/dist/models/file'

import { NotePath } from './notes/List/NotePath'
import { WithBreakpoints } from './notes/List/WithBreakpoints'

export const HeaderNotePath = ({ file }) => {
  const client = useClient()
  const parentQuery = buildFileByIdQuery(file.dir_id)
  const parentResult = useQuery(parentQuery.definition, {
    ...parentQuery.options,
    enabled: !!file.dir_id
  })

  const fileWithPath = useMemo(
    () =>
      parentResult.data ? ensureFilePath(file, parentResult.data) : undefined,
    [file, parentResult.data]
  )

  const drivePath = useMemo(
    () => getDriveLink(client, file.dir_id),
    [client, file.dir_id]
  )

  if (fileWithPath) {
    return (
      <WithBreakpoints hideOn={Breakpoints.Mobile}>
        <NotePath
          drivePath={drivePath}
          path={fileWithPath.path}
          target="_blank"
        />
      </WithBreakpoints>
    )
  }

  return null
}
