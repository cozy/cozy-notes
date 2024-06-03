import React, { useState, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import ActionMenu, {
  ActionMenuItem
} from 'cozy-ui/transpiled/react/deprecated/ActionMenu'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import Typography from 'cozy-ui/transpiled/react/Typography'
import ShareIcon from 'cozy-ui/transpiled/react/Icons/Share'
import { CozyFile } from 'cozy-doctypes'
import { SharedRecipients } from 'cozy-sharing'
import { TableRow, TableCell } from 'cozy-ui/transpiled/react/deprecated/Table'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'
import { withClient } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'

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
  const { showAlert } = useAlert()

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
      showAlert({ message: t('Notes.Delete.deleted'), severity: 'success' })
    } catch (error) {
      showAlert({ message: t('Notes.Delete.failed'), severity: 'error' })
    }
  }, [client, note, t, setMenuOpen, showAlert])

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
      showAlert({ message: t('Error.loading_error_title'), severity: 'error' })
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

          {isMobile ? (
            <div
              className="u-flex u-flex-column u-flex-grow-1"
              style={{ minWidth: 0 }}
            >
              <Typography display="inline" noWrap>
                {filename}
              </Typography>
              <NotePath drivePath={drivePath} path={note.path} noLink />
            </div>
          ) : (
            <div className="u-flex-grow-1">
              <Typography display="inline" noWrap>
                {filename}
              </Typography>
              <span className="u-ellipsis">{extension}</span>
            </div>
          )}
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
            <Link
              onClick={e => e.stopPropagation()}
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
              <SharedRecipients docId={note._id} size={24} />
            </Link>
          </TableCell>
        </WithBreakpoints>

        <TableCell
          className={styles.tableCell}
          onClick={isMobile ? openMenu : undefined}
        >
          <span ref={menuTriggerRef}>
            <IconButton onClick={!isMobile ? openMenu : undefined}>
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
            style={{ color: 'var(--primaryTextColor)' }}
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
