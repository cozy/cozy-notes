import React from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from 'cozy-ui/react/Table'
import { translate } from 'cozy-ui/react/I18n'
import EmptyComponent from './EmptyComponent'

const List = ({ t }) => (
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
      <TableRow className="tableRowEmpty">
        <TableCell className="tableCellEmpty">
          <EmptyComponent />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
)

export default translate()(List)
