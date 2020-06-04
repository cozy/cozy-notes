import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'cozy-ui/react/Icon'
import Tooltip from 'cozy-ui/react/Tooltip'
import { useI18n } from 'cozy-ui/react/I18n'

import SharingWidget from 'components/notes/sharing'

const EditorCorner = ({ doc, isPublic, isReadOnly }) => {
  if (!isPublic) return <SharingWidget file={doc.file} />
  else if (isReadOnly) {
    const { t } = useI18n()
    return (
      <Tooltip title={t('Notes.Editor.read_only')}>
        <Icon icon="lock" color="var(--primaryTextColor)" />
      </Tooltip>
    )
  } else return false
}

EditorCorner.propTypes = {
  doc: PropTypes.object.isRequired,
  isPublic: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool.isRequired
}

export default EditorCorner
