import React from 'react'

import FilePathLink from 'cozy-ui/transpiled/react/FilePathLink'
import FilePath from 'cozy-ui/transpiled/react/FilePath'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'

import { Slugs } from 'constants/strings'
import { removeFilename } from 'lib/helpers'

interface NotePathProps {
  drivePath: string
  path: string
  target?: string
  noLink?: boolean
}

interface AppLinkerCallback {
  href: string
  onClick: () => void
}

type TargetParam =
  | Record<string, never>
  | { target: string; rel: string }
  | { target: string }

const makeTarget = (target?: string): TargetParam =>
  typeof target !== 'string'
    ? {}
    : target === '_blank'
    ? { target: '_blank', rel: 'noreferrer noopener' }
    : { target }

export const NotePath: React.FC<NotePathProps> = ({
  drivePath,
  path,
  target,
  noLink
}) => {
  if (noLink) {
    return <FilePath>{removeFilename(path)}</FilePath>
  }

  return (
    <AppLinker href={drivePath} app={{ slug: Slugs.Drive }}>
      {({ href, onClick }: AppLinkerCallback): React.ReactElement => (
        <FilePathLink href={href} onClick={onClick} {...makeTarget(target)}>
          {removeFilename(path)}
        </FilePathLink>
      )}
    </AppLinker>
  )
}
