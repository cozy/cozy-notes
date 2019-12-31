import React from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from 'cozy-ui/react/Table'
import Spinner from 'cozy-ui/react/Spinner'

import { translate } from 'cozy-ui/react/I18n'
import EmptyComponent from 'components/notes/List/EmptyComponent'
import NoteRow from 'components/notes/List/NoteRow'

import styles from 'components/notes/List/list.styl'
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

const List = ({ t, notes, fetchStatus }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader className={styles.tableCellName}>
            {t('Notes.List.name')}
          </TableHeader>
          <TableHeader className={styles.tableCell}>
            {t('Notes.List.updated_at')}
          </TableHeader>
          <TableHeader className={styles.tableCell}>
            {t('Notes.List.location')}
          </TableHeader>
          <TableHeader className={styles.tableCell}>
            {t('Notes.List.sharings')}
          </TableHeader>
        </TableRow>
      </TableHead>
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
}

export default translate()(List)
