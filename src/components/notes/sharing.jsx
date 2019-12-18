import React, { useCallback, useState, useMemo } from 'react'

import SharingProvider, { ShareButton, ShareModal } from 'cozy-sharing'
import withLocales from 'cozy-sharing/dist/withLocales'

const LocalizedSharingProvider = withLocales(SharingProvider)

export default function SharingWidget(props) {
  const file = useMemo(() => {
    const id = props.fileId || props.file.id || props.file._id
    const type =
      (props.file && (props.file.type || props.file._type)) || 'io.cozy.files'
    return { _id: id, id: id, _type: type, type: type, ...(props.file || {}) }
  })
  const [showModal, setShowModal] = useState(false)
  const onClick = useCallback(() => setShowModal(!showModal), [])
  const onClose = useCallback(() => setShowModal(false), [])
  const docId = file.id
  return (
    <LocalizedSharingProvider doctype={file.type} documentType="Notes">
      <ShareButton
        theme="primary"
        docId={docId}
        onClick={onClick}
        label=""
        extension="narrow"
        iconOnly
      />
      {showModal && <ShareModal document={file} onClose={onClose} />}
    </LocalizedSharingProvider>
  )
}
