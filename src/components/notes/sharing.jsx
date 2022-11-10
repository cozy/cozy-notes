import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useClient } from 'cozy-client'
import { ShareButtonWithRecipients } from 'cozy-sharing'

import styles from 'components/notes/sharing.styl'
import useFileWithPath from 'hooks/useFileWithPath'
import { AppRoutes } from 'constants/routes'
import { DocumentTypes } from 'constants/strings'

export const SharingWidget = props => {
  const client = useClient()
  const file = useFileWithPath({ cozyClient: client, file: props.file })
  const handleClick = useCallback(() => {}, [])
  const location = useLocation()

  if (!file) return null

  const { id: noteId } = file

  return (
    <Link
      to={AppRoutes.ShareFromList}
      state={{
        backgroundLocation: location,
        shareModalProps: {
          document: {
            ...file,
            name: props.title || file.attributes.name
          },
          documentType: DocumentTypes.Notes,
          sharingDesc: props.title
        }
      }}
      style={{ textDecoration: 'none' }}
    >
      <ShareButtonWithRecipients
        theme="primary"
        docId={noteId}
        onClick={handleClick}
        extension="narrow"
        className={styles['sharing-button']}
      />
    </Link>
  )
}

export default SharingWidget
