import React from 'react'
import Stack from 'cozy-ui/react/Stack'

import AppTitle from './AppTitle'
import List from './List'

import './list.styl'

const ListView = () => (
  <Stack>
    <AppTitle />
    <List />
  </Stack>
)

export default ListView
