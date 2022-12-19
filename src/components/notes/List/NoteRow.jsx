import React, { useState, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import ActionMenu, { ActionMenuItem } from 'cozy-ui/transpiled/react/ActionMenu'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import ShareIcon from 'cozy-ui/transpiled/react/Icons/Share'
import { CozyFile } from 'cozy-doctypes'
import { SharedRecipients } from 'cozy-sharing'
import { TableRow, TableCell } from 'cozy-ui/transpiled/react/Table'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { withClient } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import NoteIcon from 'assets/icons/icon-note-32.svg'
import styles from 'components/notes/List/list.styl'
import { AppRoutes } from 'constants/routes'
import { Breakpoints } from 'types/enums'
import { DocumentTypes } from 'constants/strings'
import { NotePath } from './NotePath'
import { WithBreakpoints } from './WithBreakpoints'
import { generateReturnUrlToNotesIndex, getDriveLink } from 'lib/utils'

const NoteRow = ({ note, f, t, client }) => {
  const { isMobile } = useBreakpoints()
  const location = useLocation()
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

  const deleteNote = useCallback(async () => {
    try {
      await client.destroy(note)
      setMenuOpen(false)
      Alerter.info(t('Notes.Delete.deleted'))
    } catch (error) {
      Alerter.error(t('Notes.Delete.failed'))
    }
  }, [client, note, t, setMenuOpen])

  const drivePath = useMemo(() => getDriveLink(client, note.dir_id), [
    client,
    note
  ])

  const menuTriggerRef = React.createRef()

  const goToNote = async () => {
    try {
      const url = await generateReturnUrlToNotesIndex(client, note)
      window.location.href = url
    } catch (error) {
      Alerter.error(t('Error.loading_error_title'))
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      goToNote()
    }
  }

  return (
    <>
      <TableRow
        className={`u-c-pointer ${styles.tableRow}`}
        role="button"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        onClick={goToNote}
      >
        <TableCell
          className={`${styles.tableCellName} u-flex u-flex-items-center u-fz-medium`}
        >
          <Icon icon={NoteIcon} size={32} className="u-mr-1 u-flex-shrink-0" />

          <div className="u-flex-grow-1">
            <span className="u-charcoalGrey u-ellipsis">{filename}</span>

            <WithBreakpoints hideOn={Breakpoints.Mobile}>
              <span className="u-ellipsis">{extension}</span>
            </WithBreakpoints>

            <WithBreakpoints showOn={Breakpoints.Mobile}>
              <NotePath drivePath={drivePath} path={note.path} noLink />
            </WithBreakpoints>
          </div>
        </TableCell>

        <WithBreakpoints hideOn={Breakpoints.Mobile}>
          <TableCell className={styles.tableCell}>
            {t('Notes.List.at', {
              date: f(note.updated_at, 'DD MMMM'),
              time: f(note.updated_at, 'HH:mm')
            })}
          </TableCell>

          <TableCell
            className={`${styles.tableCell} u-flex-shrink-0`}
            onClick={e => e.stopPropagation()}
          >
            <NotePath drivePath={drivePath} path={note.path} />
          </TableCell>

          <TableCell className={styles.tableCell}>
            <SharedRecipients docId={note._id} size={24} />
          </TableCell>
        </WithBreakpoints>

        <TableCell className={styles.tableCell} onClick={isMobile && openMenu}>
          <span ref={menuTriggerRef}>
            <IconButton onClick={!isMobile && openMenu}>
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
          <Link
            className={styles.actionMenuItem}
            onClick={closeMenu}
            to={AppRoutes.ShareFromList}
            state={{
              backgroundLocation: location,
              shareModalProps: {
                document: { ...note, name: note.attributes.name },
                documentType: DocumentTypes.Notes,
                sharingDesc: note.attributes.name
              }
            }}
          >
            <ActionMenuItem
              left={<Icon icon={ShareIcon} />}
              autoclose={true}
              right={
                <WithBreakpoints showOn={Breakpoints.Mobile}>
                  <SharedRecipients docId={note.id} size="small" />
                </WithBreakpoints>
              }
            >
              {t('Notes.Files.share.cta')}
            </ActionMenuItem>
          </Link>

          <ActionMenuItem onClick={deleteNote} left={<Icon icon="trash" />}>
            {t('Notes.Delete.delete_note')}
          </ActionMenuItem>
        </ActionMenu>
      )}
    </>
  )
}

export default translate()(withClient(NoteRow))
