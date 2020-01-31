import React, { useState, useCallback } from 'react'
import { CozyFile } from 'cozy-doctypes'
import { withClient } from 'cozy-client'

import { withBreakpoints } from 'cozy-ui/react'
import { translate } from 'cozy-ui/react/I18n'
import Icon from 'cozy-ui/react/Icon'
import IconButton from 'cozy-ui/react/IconButton'
import Alerter from 'cozy-ui/react/Alerter'
import ActionMenu, { ActionMenuItem } from 'cozy-ui/react/ActionMenu'
import { TableRow, TableCell } from 'cozy-ui/react/Table'

import styles from 'components/notes/List/list.styl'
import { generateReturnUrlToNotesIndex } from 'lib/utils'
import NoteIcon from 'assets/icons/icon-note-32.svg'

const NoteRow = ({ note, f, t, client, breakpoints: { isMobile } }) => {
  const { filename, extension } = CozyFile.splitFilename(note)

  const [isMenuOpen, setMenuOpen] = useState(false)
  const openMenu = useCallback(
    e => {
      setMenuOpen(true)
      e.stopPropagation()
    },
    [setMenuOpen]
  )
  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen])

  const deleteNote = useCallback(
    async () => {
      try {
        await client.destroy(note)
        setMenuOpen(false)
        Alerter.info(t('Notes.Delete.deleted'))
      } catch (error) {
        Alerter.error(t('Notes.Delete.failed'))
      }
    },
    [client, note, t, setMenuOpen]
  )

  const menuTriggerRef = React.createRef()

  return (
    <>
      <TableRow
        className={`u-c-pointer ${styles.tableRow}`}
        onClick={() =>
          (window.location.href = generateReturnUrlToNotesIndex(note))
        }
      >
        <TableCell
          className={`${
            styles.tableCellName
          } u-flex u-flex-items-center u-ellipsis u-fz-medium`}
        >
          <Icon icon={NoteIcon} size={32} className="u-mr-1 u-flex-shrink-0" />
          <span className="u-charcoalGrey">{filename}</span>
          <span>{extension}</span>
        </TableCell>
        {!isMobile && (
          <>
            <TableCell className={styles.tableCell}>
              {t('Notes.List.at', {
                date: f(note.updated_at, 'DD MMMM'),
                time: f(note.updated_at, 'HH:mm')
              })}
            </TableCell>
            <TableCell className={styles.tableCell}>—</TableCell>
            <TableCell className={styles.tableCell}>—</TableCell>
            <TableCell className={styles.tableCell}>
              <span ref={menuTriggerRef}>
                <IconButton onClick={openMenu}>
                  <Icon icon="dots" />
                </IconButton>
              </span>
            </TableCell>
          </>
        )}
      </TableRow>
      {isMenuOpen && (
        <ActionMenu
          onClose={closeMenu}
          anchorElRef={menuTriggerRef}
          placement="bottom-end"
        >
          <ActionMenuItem onClick={deleteNote} left={<Icon icon="trash" />}>
            {t('Notes.Delete.delete_note')}
          </ActionMenuItem>
        </ActionMenu>
      )}
    </>
  )
}

export default withBreakpoints()(translate()(withClient(NoteRow)))
