/* global cozy */
import React from 'react'
import Stack from 'cozy-ui/react/Stack'
import BarButton from 'cozy-ui/react/BarButton'
import { withBreakpoints } from 'cozy-ui/react'
import { withClient } from 'cozy-client'
import AppTitle from './AppTitle'
import List from './List'
import Add from 'components/notes/add'
import { createNoteDocument, generateReturnUrlToNotesIndex } from 'lib/utils'

import './list.styl'

const ListView = ({ breakpoints: { isMobile }, client }) => {
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
          <BarButton
            onClick={async () => {
              const { data: doc } = await createNoteDocument(client)
              window.location.href = generateReturnUrlToNotesIndex(doc)
            }}
            icon="plus"
          />
        </BarRight>
      )}
    </>
  )
}

export default withBreakpoints()(withClient(ListView))
