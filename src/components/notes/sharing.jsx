import React, { useCallback, useState, useMemo, useEffect } from 'react'
import SharingProvider, { ShareButton, ShareModal } from 'cozy-sharing'
import { withClient } from 'cozy-client'
import withLocales from 'cozy-sharing/dist/withLocales'

const LocalizedSharingProvider = withLocales(SharingProvider)

export default withClient(function SharingWidget(props) {
  const { client } = props
  const [parent, setParent] = useState(undefined)

  const id = props.fileId || props.file.id || props.file._id

  const file = useMemo(
    () => {
      const type =
        (props.file && (props.file.type || props.file._type)) || 'io.cozy.files'
      const path = parent && parent.path + '/' + props.file.name
      return {
        _id: id,
        id: id,
        _type: type,
        type: type,
        path: path,
        ...(props.file || {})
      }
    },
    [id, parent]
  )

  useEffect(
    () => {
      async function getParent(file) {
        const parent = await client.query(
          client.get('io.cozy.files', file.attributes.dir_id)
        )
        setParent(parent.data)
      }
      getParent(file)
    },
    [file.attributes.dir_id]
  )

  const [showModal, setShowModal] = useState(false)
  const onClick = useCallback(() => setShowModal(!showModal), [])
  const onClose = useCallback(() => setShowModal(false), [])
  const docId = file.id
  return (
    (parent && (
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
    )) ||
    null
  )
})
