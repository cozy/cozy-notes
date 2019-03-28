import React from 'react'

import Spinner from 'cozy-ui/react/Spinner'
import { Link } from 'react-router-dom'

import { queryConnect } from 'cozy-client'
import ListItemText from 'cozy-ui/react/ListItemText'
import Button from 'cozy-ui/react/Button'
import Icon from 'cozy-ui/react/Icon'
import { MainTitle } from 'cozy-ui/react/Text'

import Add from './add'
import query from './query'
import { titleWithDefault } from './utils'

import HeaderMenu from '../header_menu.jsx'

import icon from '../../assets/icons/icon-note-32.svg'

const Item = props => <div className="note-item">
  <Icon icon={icon} width={32} height={32} className="note-icon" />
  <Link to={`/n/${props.note.id}`} className="note-link">
    <ListItemText
      primaryText={titleWithDefault(props.note)}
      secondaryText='/Notes/2019/demo'
    />
  </Link>
</div>

const Row = props => {
  const updatedAt = new Date(props.note.cozyMetadata.updatedAt)
  const options = { day: "numeric", month: "long", year: "numeric" }
  const formatedUpdatedAt = updatedAt.toLocaleDateString(undefined, options)
  return <tr class="c-table-row">
    <th class="c-table-cell c-table-cell--primary">
      <Item {...props} />
    </th>
    <td class="c-table-cell">
      <time datatime={props.note.cozyMetadata.updatedAt}>
        {formatedUpdatedAt}
      </time>
    </td>
    <td class="c-table-cell">
      —
    </td>
    <td class="c-table-cell">
      <Button
        theme="action"
        extension="narrow"
        icon={<Icon icon="dots" color="coolGrey" width="17" height="17" />}
        iconOnly
        label='actions'
      />
    </td>
  </tr>
}

const List = props => {
  const { notes } = props
  return !notes || !notes.length ? null : (
    <table className="notes-list c-table">
      <thead class="c-table-head">
        <tr class="c-table-row-head">
          <th class="c-table-header">Nom</th>
          <th class="c-table-header">Dernière mise à jour</th>
          <th class="c-table-header">Partages</th>
          <th class="c-table-header"></th>
        </tr>
      </thead>
      <tbody>
        {notes.map(note => (
          <Row key={note._id} note={note} />
        ))}
      </tbody>
    </table>
  )
}

const ConnectedList = props => {
  const { data, fetchStatus } = props.notes
  // cozy-client statuses
  const isLoading = fetchStatus === 'loading' || fetchStatus === 'pending'
  return (
    <div className="notes notes-list-container">
      {isLoading ? (
        <Spinner size="xxlarge" middle />
      ) : (
        <div>
          <HeaderMenu left={<MainTitle tag="h1">Mes notes</MainTitle>} right={<Add />} />
          <List notes={data} />
        </div>
      )}
    </div>
  )
}

export default queryConnect({
  notes: {
    query: query,
    as: 'notes'
  }
})(ConnectedList)
