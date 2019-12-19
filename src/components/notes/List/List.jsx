import React from 'react'
import { queryConnect } from 'cozy-client'
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
import Add from 'components/notes/add'

const EmptyTableRow = () => (
  <TableRow className="tableRowEmpty">
    <TableCell className="tableCellEmpty">
      <EmptyComponent />
    </TableCell>
  </TableRow>
)

const LoadingTableRow = () => (
  <TableRow className="tableRowEmpty">
    <TableCell className="tableCellEmpty u-ta-center">
      <Spinner size="xxlarge" />
    </TableCell>
  </TableRow>
)

const AddNoteRow = () => (
  <TableRow className="tableRowEmpty">
    <TableCell className="tableCellEmpty u-ta-center">
      <Add />
    </TableCell>
  </TableRow>
)

const List = ({ t, notesQuery: { fetchStatus, count, data } }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader className="tableCellName">
          {t('Notes.List.name')}
        </TableHeader>
        <TableHeader className="tableCell">
          {t('Notes.List.updated_at')}
        </TableHeader>
        <TableHeader className="tableCell">
          {t('Notes.List.location')}
        </TableHeader>
        <TableHeader className="tableCell">
          {t('Notes.List.sharings')}
        </TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      {fetchStatus === 'loading' ? (
        <LoadingTableRow />
      ) : count === 0 ? (
        <EmptyTableRow />
      ) : (
        <>
          {data.map(note => (
            <NoteRow note={note} key={note._id} />
          ))}
          <AddNoteRow />
        </>
      )}
    </TableBody>
  </Table>
)

const query = client =>
  client
    .all('io.cozy.files')
    .where({
      cozyMetadata: { createdByApp: 'notes' },
      updated_at: { $gt: null }
    })
    .sortBy([{ 'cozyMetadata.createdByApp': 'desc' }, { updated_at: 'desc' }])
    .indexFields(['cozyMetadata.createdByApp', 'updated_at'])

export default translate()(queryConnect({ notesQuery: { query } })(List))
