import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'cozy-ui/transpiled/react/Icon'
import Tooltip from 'cozy-ui/transpiled/react/Tooltip'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import SharingWidget from 'components/notes/sharing'

const EditorCorner = ({ doc, isPublic, isReadOnly }) => {
  const { t } = useI18n()
  if (!isPublic) return <SharingWidget file={doc.file} />
  else if (isReadOnly) {
    return (
      <Tooltip title={t('Notes.Editor.read_only')}>
        <Icon icon="lock" color="var(--primaryTextColor)" />
      </Tooltip>
    )
  } else return null
}

EditorCorner.propTypes = {
  doc: PropTypes.object.isRequired,
  isPublic: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool.isRequired
}

export default EditorCorner
