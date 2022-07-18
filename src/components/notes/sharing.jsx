import React, { useState, useCallback } from 'react'
import { ShareButton, ShareModal } from 'cozy-sharing'
import { useClient } from 'cozy-client'

import useFileWithPath from 'hooks/useFileWithPath'
import styles from 'components/notes/sharing.styl'
import { DocumentTypes } from 'constants/strings'

export default function SharingWidget(props) {
  const client = useClient()
  const file = useFileWithPath({ cozyClient: client, file: props.file })
  const [showModal, setShowModal] = useState(false)
  const onClick = useCallback(() => setShowModal(!showModal), [showModal])
  const onClose = useCallback(() => setShowModal(false), [])

  if (!file) return null

  const { id: noteId } = file

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
          // If the user didn't write any title, then the props.title is undefined
          // In that case, we fallback to the file.attributes.names. It'll be something
          // like "New Note ...."
          document={{
            ...file,
            name: props.title ? props.title : file.attributes.name
          }}
          documentType={DocumentTypes.Notes}
          onClose={onClose}
          sharingDesc={props.title}
        />
      )}
    </>
  )
}
