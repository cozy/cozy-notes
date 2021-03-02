import React, { useState, useCallback } from 'react'
import { CozyFile } from 'cozy-doctypes'
import { withClient } from 'cozy-client'
import { SharedRecipients } from 'cozy-sharing'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import ActionMenu, { ActionMenuItem } from 'cozy-ui/transpiled/react/ActionMenu'
import { TableRow, TableCell } from 'cozy-ui/transpiled/react/Table'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import styles from 'components/notes/List/list.styl'
import { generateReturnUrlToNotesIndex } from 'lib/utils'
import NoteIcon from 'assets/icons/icon-note-32.svg'

const NoteRow = ({ note, f, t, client }) => {
  const { filename, extension } = CozyFile.splitFilename(note)
  const { isMobile } = useBreakpoints()

  const [isMenuOpen, setMenuOpen] = useState(false)
  const openMenu = useCallback(
    e => {
      setMenuOpen(true)
      e.stopPropagation()
    },
    [setMenuOpen]
  )
  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen])

  const deleteNote = useCallback(async () => {
    try {
      await client.destroy(note)
      setMenuOpen(false)
      Alerter.info(t('Notes.Delete.deleted'))
    } catch (error) {
      Alerter.error(t('Notes.Delete.failed'))
    }
  }, [client, note, t, setMenuOpen])

  const menuTriggerRef = React.createRef()

  return (
    <>
      <TableRow
        className={`u-c-pointer ${styles.tableRow}`}
        onClick={async () => {
          const url = await generateReturnUrlToNotesIndex(client, note)
          window.location.href = url
        }}
      >
        <TableCell
          className={`${styles.tableCellName} u-flex u-flex-items-center u-fz-medium`}
        >
          <Icon icon={NoteIcon} size={32} className="u-mr-1 u-flex-shrink-0" />
          <span className="u-charcoalGrey u-ellipsis">{filename}</span>
          {!isMobile && <span className="u-ellipsis">{extension}</span>}
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
            <TableCell className={styles.tableCell}>
              <SharedRecipients docId={note._id} size="small" />
            </TableCell>
          </>
        )}
        <TableCell className={styles.tableCell}>
          <span ref={menuTriggerRef}>
            <IconButton onClick={openMenu}>
              <Icon icon="dots" />
            </IconButton>
          </span>
        </TableCell>
      </TableRow>
      {isMenuOpen && (
        <ActionMenu
          onClose={closeMenu}
          anchorElRef={menuTriggerRef}
          popperOptions={{
            strategy: 'fixed'
          }}
        >
          <ActionMenuItem onClick={deleteNote} left={<Icon icon="trash" />}>
            {t('Notes.Delete.delete_note')}
          </ActionMenuItem>
        </ActionMenu>
      )}
    </>
  )
}

export default translate()(withClient(NoteRow))
