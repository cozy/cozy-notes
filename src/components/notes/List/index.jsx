/* global cozy */
import React from 'react'
import Stack from 'cozy-ui/react/Stack'
import { withBreakpoints } from 'cozy-ui/react'
import AppTitle from './AppTitle'
import List from 'components/notes/List/List'
import Add, { AddMobile } from 'components/notes/add'

import 'components/notes/List/list.styl'

const ListView = ({ breakpoints: { isMobile } }) => {
  const { BarRight } = cozy.bar
  return (
    <>
      <Stack className="u-mt-1 u-mt-3-m">
        <div className="u-flex u-flex-justify-between u-flex-items-center">
          <AppTitle />
          {!isMobile && <Add />}
        </div>
        <List />
      </Stack>
      {isMobile && (
        <BarRight>
          <AddMobile />
        </BarRight>
      )}
    </>
  )
}

export default withBreakpoints()(ListView)
