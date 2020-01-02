import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonLink } from 'cozy-ui/react/Button'
import IsPublicContext from 'components/IsPublicContext'
import AppLinker from 'cozy-ui/react/AppLinker'
import { getFolderLink, getParentFolderId } from 'lib/utils'

export default function BackFromEditing({ returnUrl, file }) {
  const isPublic = useContext(IsPublicContext)
  if (returnUrl) {
    const nativePath = getFolderLink(getParentFolderId(file))
    return (
      <AppLinker slug="drive" href={returnUrl} nativePath={nativePath}>
        {({ onClick, href }) => {
          return (
            <ButtonLink
              icon="previous"
              onClick={onClick}
              href={href}
              className="sto-app-back"
              subtle
            />
          )
        }}
      </AppLinker>
    )
  } else if (!isPublic) {
    return (
      <Button
        icon="previous"
        tag={Link}
        to="/"
        className="sto-app-back"
        subtle
      />
    )
  } else {
    return null
  }
}
