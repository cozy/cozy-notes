import React, { useCallback, useState, useMemo, useEffect } from 'react'
import SharingProvider, { ShareButton, ShareModal } from 'cozy-sharing'
import { withClient, models } from 'cozy-client'
import { withLocales } from 'cozy-sharing'

const LocalizedSharingProvider = withLocales(SharingProvider)

function normalizeFileAndPath(id, file, parent) {
  const withId = { id, ...file }
  const normalized = models.file.normalize(withId)
  if (parent && parent.path) {
    const withPath = models.file.ensureFilePath(normalized, parent)
    return withPath
  } else {
    return normalized
  }
}

export default withClient(function SharingWidget(props) {
  const { client } = props
  const [parent, setParent] = useState(undefined)

  const id = props.file.id || props.file._id

  const file = useMemo(() => normalizeFileAndPath(id, props.file, parent), [
    id,
    parent
  ])

  useEffect(
    () => {
      async function getParent(file) {
        try {
          const parent = await client.query(
            client.get('io.cozy.files', file.attributes.dir_id)
          )
          setParent(parent.data)
        } catch (e) {
          console.warn(
            `Request failed when try to fetch the parent ${
              file.attributes.dir_id
            } of io.cozy.files ${file.id || file._id}`
          )
          // nothing to do here
          // @TODO send a sentry event
        }
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
