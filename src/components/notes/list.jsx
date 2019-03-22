import React from 'react'

import Spinner from 'cozy-ui/react/Spinner'
import { Link } from 'react-router-dom'

import { queryConnect } from 'cozy-client'
import ListItemText from 'cozy-ui/react/ListItemText'
import ContextHeader from 'cozy-ui/react/ContextHeader'

import Add from './add'
import doctype from './doctype'
import schema from './schema'
import query from './query'
import { titleWithDefault } from './utils'

import HeaderMenu from '../header_menu.jsx'

const Item = (props) => <li>
  <Link to={`/n/${props.note.id}`}>
    <ListItemText primaryText={titleWithDefault(props.note)} />
  </Link>
</li>

const List = props => {
  const { notes } = props
  return (!notes || !notes.length) ? null : <ul type='none'>
    {notes.map(note => <Item key={note._id} note={note} />)}
  </ul>
}


const ConnectedList = props => {
  const { data, fetchStatus } = props.notes
  // cozy-client statuses
  const isLoading = fetchStatus === 'loading' || fetchStatus === 'pending'
  return (
    <div className="notes">
      {isLoading ? (
        <Spinner size="xxlarge" middle />
      ) : (
        <div>
          <HeaderMenu right={<Add />} />
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
