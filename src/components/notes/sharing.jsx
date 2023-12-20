import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ShareButtonWithRecipients } from 'cozy-sharing'

import styles from 'components/notes/sharing.styl'
import { AppRoutes } from 'constants/routes'
import { DocumentTypes } from 'constants/strings'

export const SharingWidget = ({ file, title }) => {
  const handleClick = useCallback(() => {}, [])
  const location = useLocation()

  if (file) {
    const { id: noteId } = file

    return (
      <Link
        to={AppRoutes.ShareFromList}
        state={{
          backgroundLocation: location,
          shareModalProps: {
            document: {
              ...file,
              name: title || file?.attributes?.name
            },
            documentType: DocumentTypes.Notes,
            sharingDesc: title
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

  return null
}

export default SharingWidget
