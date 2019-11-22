import React from 'react'

import Spinner from 'cozy-ui/react/Spinner'
import { Link } from 'react-router-dom'

import ListItemText from 'cozy-ui/react/ListItemText'
import Button from 'cozy-ui/react/Button'
import Icon from 'cozy-ui/react/Icon'
import { MainTitle } from 'cozy-ui/react/Text'

import Add from './add'

import HeaderMenu from '../header_menu.jsx'

import icon from '../../assets/icons/icon-note-32.svg'

const titleWithDefault = () => {}

const Item = props => (
  <div className="note-item">
    <Icon icon={icon} width={32} height={32} className="note-icon" />
    <Link to={`/n/${props.note.id}`} className="note-link">
      <ListItemText
        primaryText={titleWithDefault(props.note)}
        secondaryText="/Notes/2019/demo"
      />
    </Link>
  </div>
)

const Row = props => {
  const updatedAt = new Date(props.note.cozyMetadata.updatedAt)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  const formatedUpdatedAt = updatedAt.toLocaleDateString(undefined, options)
  return (
    <tr className="c-table-row">
      <th className="c-table-cell c-table-cell--primary">
        <Item {...props} />
      </th>
      <td className="c-table-cell">
        <time datatime={props.note.cozyMetadata.updatedAt}>
          {formatedUpdatedAt}
        </time>
      </td>
      <td className="c-table-cell">—</td>
      <td className="c-table-cell">
        <Button
          theme="action"
          extension="narrow"
          icon={<Icon icon="dots" color="coolGrey" width="17" height="17" />}
          iconOnly
          label="actions"
        />
      </td>
    </tr>
  )
}

const List = props => {
  const { notes } = props
  return !notes || !notes.length ? null : (
    <table className="notes-list c-table">
      <thead className="c-table-head">
        <tr className="c-table-row-head">
          <th className="c-table-header">Nom</th>
          <th className="c-table-header">Dernière mise à jour</th>
          <th className="c-table-header">Partages</th>
          <th className="c-table-header" />
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

const ListHeader = () => {
  return (
    <>
      <HeaderMenu
        left={<MainTitle tag="h1">Mes notes</MainTitle>}
        right={<Add />}
      />
    </>
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
          <ListHeader />
          <List notes={data} />
        </div>
      )}
    </div>
  )
}

export default ListHeader
