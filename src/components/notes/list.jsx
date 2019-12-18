import React from 'react'

import { MainTitle } from 'cozy-ui/react/Text'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from 'cozy-ui/react/Table'
import Empty from 'cozy-ui/react/Empty'
import Stack from 'cozy-ui/react/Stack'
import { translate } from 'cozy-ui/react/I18n'
import { withBreakpoints } from 'cozy-ui/transpiled/react'

import Add from './add'
import icon from '../../assets/icons/icon_note_empty.svg'
import './list.styl'

const EmptyComponent = translate()(({ t }) => (
  <div className="empty">
    <Empty
      id="empty"
      icon={icon}
      title={t('Notes.Empty.welcome')}
      text={t('Notes.Empty.after_created')}
    >
      <Add className="u-mt-1" />
    </Empty>
  </div>
))
/* const cellStyles = { flexGrow: 1 }
const nameCellStyles = { flexGrow: 10 } */
const List = translate()(({ t }) => (
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
))

const TitleApp = translate()(({ t }) => (
  <MainTitle className="u-pl-1">{t('Notes.List.my_notes')}</MainTitle>
))

const EmptyPage = withBreakpoints()(({ breakpoints: { isMobile } }) => (
  //On Mobile, we don't want a margin top since we don't have title and
  //we want the component to start at the end of the bar
  <Stack className={isMobile ? '' : 'u-mt-1'}>
    <TitleApp />
    <List />
  </Stack>
))
export default EmptyPage
