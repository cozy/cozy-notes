import React from 'react'
import { CozyFile } from 'cozy-doctypes'

import { withBreakpoints } from 'cozy-ui/react'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'
import { TableRow, TableCell } from 'cozy-ui/react/Table'

import 'components/notes/List/list.styl'
import { generateReturnUrlToNotesIndex } from 'lib/utils'
import NoteIcon from 'assets/icons/icon-note-32.svg'

const NoteRow = ({ note, f, breakpoints: { isMobile } }) => {
  const { filename, extension } = CozyFile.splitFilename(note)
  return (
    <TableRow
      className="u-c-pointer tableRow"
      onClick={() =>
        (window.location.href = generateReturnUrlToNotesIndex(note))
      }
    >
      <TableCell className="tableCellName u-flex u-flex-items-center u-ellipsis u-fz-medium">
        <Icon icon={NoteIcon} size={32} className="u-mr-1 u-flex-shrink-0" />
        <span className="u-charcoalGrey">{filename}</span>
        <span>{extension}</span>
      </TableCell>
      {!isMobile && (
        <>
          <TableCell className="tableCell">
            {f(note.updated_at, 'DD MMMM')}
          </TableCell>
          <TableCell className="tableCell">—</TableCell>
          <TableCell className="tableCell">—</TableCell>
        </>
      )}
    </TableRow>
  )
}

export default withBreakpoints()(translate()(NoteRow))
