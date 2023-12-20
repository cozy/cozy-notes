import React, { useMemo } from 'react'

import { getDriveLink } from 'lib/utils'
import { Breakpoints } from 'types/enums'
import { NotePath } from './notes/List/NotePath'
import { WithBreakpoints } from './notes/List/WithBreakpoints'
import { useClient, useQuery } from 'cozy-client'
import { buildFileByIdQuery } from 'lib/queries'

import { ensureFilePath } from 'cozy-client/dist/models/file'

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

  const drivePath = useMemo(() => getDriveLink(client, file.dir_id), [
    client,
    file.dir_id
  ])

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
