import EmptyComponent from 'components/notes/List/EmptyComponent'
import NoteRow from 'components/notes/List/NoteRow'
import styles from 'components/notes/List/list.styl'
import React from 'react'
import { Breakpoints } from 'types/enums'

import Spinner from 'cozy-ui/transpiled/react/Spinner'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from 'cozy-ui/transpiled/react/deprecated/Table'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

import { WithBreakpoints } from './WithBreakpoints'

const EmptyTableRow = () => (
  <TableRow className={styles.tableSpecialRow}>
    <TableCell className={styles.tableCellEmpty}>
      <EmptyComponent />
    </TableCell>
  </TableRow>
)

const LoadingTableRow = () => (
  <TableRow className={styles.tableSpecialRow}>
    <TableCell className={`${styles.tableCellEmpty} u-ta-center`}>
      <Spinner size="xxlarge" />
    </TableCell>
  </TableRow>
)

const List = ({ t, notes, fetchStatus }) => (
  <Table className={`${styles.table} ${notes.length === 0 && styles.notable}`}>
    {notes.length > 0 && (
      <TableHead>
        <TableRow>
          <TableHeader className={styles.tableCellName}>
            {t('Notes.List.name')}
          </TableHeader>

          <WithBreakpoints hideOn={Breakpoints.Mobile}>
            <TableHeader className={styles.tableCell}>
              {t('Notes.List.updated_at')}
            </TableHeader>

            <TableHeader className={`${styles.tableCell} u-flex-shrink-0`}>
              {t('Notes.List.location')}
            </TableHeader>

            <TableHeader className={styles.tableCell}>
              {t('Notes.List.sharings')}
            </TableHeader>
          </WithBreakpoints>

          <TableHeader className={styles.tableCell} />
        </TableRow>
      </TableHead>
    )}

    <TableBody>
      {fetchStatus === 'loading' ? (
        <LoadingTableRow />
      ) : notes.length === 0 ? (
        <EmptyTableRow />
      ) : (
        notes.map(note => <NoteRow note={note} key={note._id} />)
      )}
    </TableBody>
  </Table>
)

export default translate()(List)
