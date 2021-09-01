import React, { useCallback, useState } from 'react'
import { ShareButton, ShareModal } from 'cozy-sharing'
import { useClient } from 'cozy-client'

import useFileWithPath from 'hooks/useFileWithPath'
import styles from 'components/notes/sharing.styl'

export default function SharingWidget(props) {
  const client = useClient()
  const file = useFileWithPath({ cozyClient: client, file: props.file })
  const [showModal, setShowModal] = useState(false)
  const onClick = useCallback(() => setShowModal(!showModal), [showModal])
  const onClose = useCallback(() => setShowModal(false), [])

  if (!file) return null

  const {
    id: noteId,
    attributes: { name }
  } = file

  return (
    <>
      <ShareButton
        theme="primary"
        docId={noteId}
        onClick={onClick}
        extension="narrow"
        className={styles['sharing-button']}
      />
      {showModal && (
        <ShareModal
          document={{ ...file, name }}
          documentType="Files"
          onClose={onClose}
          sharingDesc={name}
        />
      )}
    </>
  )
}
