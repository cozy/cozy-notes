import React from 'react'

import FilePathLink from 'cozy-ui/transpiled/react/FilePathLink'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'

import { Slugs } from 'constants/strings'
import { removeFilename, stopPropagation } from 'lib/helpers'

export const NotePath: React.FC<{
  drivePath: string
  path: string
  target?: string
}> = ({ drivePath, path, target }) => (
  <AppLinker href={drivePath} slug={Slugs.Drive}>
    {({ href }: { href: string }): React.ReactElement => (
      <FilePathLink
        href={href}
        onClick={stopPropagation}
        {...(target && target === '_blank'
          ? { target: '_blank', rel: 'noreferrer noopener' }
          : { target })}
      >
        {removeFilename(path)}
      </FilePathLink>
    )}
  </AppLinker>
)
