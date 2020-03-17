import React, { useCallback, useState } from 'react'
import { ShareButton, ShareModal, withLocales } from 'cozy-sharing'
import { withClient } from 'cozy-client'

import useFileWithPath from 'hooks/useFileWithPath'
import styles from 'components/notes/sharing.styl'

export default withLocales(
  withClient(function SharingWidget(props) {
    const { client } = props

    const file = useFileWithPath({ cozyClient: client, file: props.file })
    const noteId = file && file.id

    const [showModal, setShowModal] = useState(false)
    const onClick = useCallback(() => setShowModal(!showModal), [showModal])
    const onClose = useCallback(() => setShowModal(false), [])

    return (
      (file && (
        <>
          <ShareButton
            theme="primary"
            docId={noteId}
            onClick={onClick}
            extension="narrow"
            className={styles['sharing-button']}
          />
          {showModal && <ShareModal document={file} onClose={onClose} />}
        </>
      )) ||
      null
    )
  })
)
