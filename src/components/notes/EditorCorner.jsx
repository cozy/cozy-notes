import SharingWidget from 'components/notes/sharing'
import PropTypes from 'prop-types'
import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import Tooltip from 'cozy-ui/transpiled/react/Tooltip'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

// https://mui.com/components/tooltips/#custom-child-element
const ForwardedIcon = React.forwardRef(function ForwardedIcon(props, ref) {
  return (
    <div ref={ref}>
      <Icon {...props} />
    </div>
  )
})

/**
 * EditorCorner is responsible to display the sharing button or the lock icon
 *
 * @component
 * @param {boolean} isPublic - Indicates whether the editor is public or not.
 * @param {boolean} isReadOnly - Indicates whether the editor is read-only or not.
 * @param {string} title - The title of the editor.
 * @param {import('cozy-client/types').IOCozyFile} file - The file associated with the editor.
 */
const EditorCorner = ({ isPublic, isReadOnly, title, file }) => {
  const { t } = useI18n()

  if (!isPublic) {
    return <SharingWidget file={file} title={title} />
  }

  if (isReadOnly) {
    return (
      <Tooltip title={t('Notes.Editor.read_only')}>
        <ForwardedIcon icon="lock" color="var(--primaryTextColor)" />
      </Tooltip>
    )
  }

  return null
}

EditorCorner.propTypes = {
  isPublic: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired
}

export default EditorCorner
