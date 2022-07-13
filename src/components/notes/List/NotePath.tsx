import React from 'react'

import FilePathLink from 'cozy-ui/transpiled/react/FilePathLink'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'

import { Slugs } from 'constants/strings'
import { removeFilename } from 'lib/helpers'

interface NotePathProps {
  drivePath: string
  path: string
  target?: string
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
  target
}) => (
  <AppLinker href={drivePath} app={{ slug: Slugs.Drive }}>
    {({ href, onClick }: AppLinkerCallback): React.ReactElement => (
      <FilePathLink href={href} onClick={onClick} {...makeTarget(target)}>
        {removeFilename(path)}
      </FilePathLink>
    )}
  </AppLinker>
)
