import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'cozy-ui/react/Icon'
import Tooltip from 'cozy-ui/react/Tooltip'

import SharingWidget from 'components/notes/sharing'

const EditorCorner = ({ doc, isPublic, isReadOnly }) => {
  if (!isPublic) return <SharingWidget file={doc.file} />
  else if (isReadOnly)
    return (
      <Tooltip title={'This note is in read-only mode.'}>
        <Icon icon="lock" color="var(--primaryTextColor)" />
      </Tooltip>
    )
  else return false
}

EditorCorner.propTypes = {
  doc: PropTypes.object.isRequired,
  isPublic: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool.isRequired
}

export default EditorCorner
