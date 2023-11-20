import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'cozy-ui/transpiled/react/Icon'
import Tooltip from 'cozy-ui/transpiled/react/Tooltip'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import SharingWidget from 'components/notes/sharing'

// https://mui.com/components/tooltips/#custom-child-element
const ForwardedIcon = React.forwardRef(function ForwardedIcon(props, ref) {
  return (
    <div ref={ref}>
      <Icon {...props} />
    </div>
  )
})

const EditorCorner = ({ doc, isPublic, isReadOnly, title }) => {
  const { t } = useI18n()
  if (!isPublic) return <SharingWidget file={doc.file} title={title} />
  else if (isReadOnly) {
    return (
      <Tooltip title={t('Notes.Editor.read_only')}>
        <ForwardedIcon icon="lock" color="var(--primaryTextColor)" />
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
