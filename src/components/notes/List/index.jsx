import AppTitle from 'components/notes/List/AppTitle'
import List from 'components/notes/List/List'
import styles from 'components/notes/List/list.styl'
import Add, { AddMobile } from 'components/notes/add'
import React from 'react'
import { Breakpoints } from 'types/enums'

import { BarRight } from 'cozy-bar'
import { Query, Q } from 'cozy-client'
import Stack from 'cozy-ui/transpiled/react/Stack'

import { WithBreakpoints } from './WithBreakpoints'

const shouldDisplayAddButton = (fetchStatus, notes) =>
  fetchStatus === 'loaded' && notes.length > 0

const ListView = () => {
  return (
    <Query query={() => Q('io.cozy.notes')}>
      {({ data: notes, fetchStatus }) => (
        <>
          <Stack>
            <WithBreakpoints hideOn={Breakpoints.Mobile}>
              <div
                className={
                  notes.length > 0
                    ? `${styles.appHeader} u-flex u-flex-justify-between u-flex-items-center u-mt-1`
                    : ''
                }
              >
                {notes.length > 0 && <AppTitle />}

                {shouldDisplayAddButton(fetchStatus, notes) && <Add />}
              </div>
            </WithBreakpoints>

            <List notes={notes} fetchStatus={fetchStatus} />
          </Stack>

          {shouldDisplayAddButton(fetchStatus, notes) && (
            <WithBreakpoints showOn={Breakpoints.Mobile}>
              <BarRight>
                <AddMobile />
              </BarRight>
            </WithBreakpoints>
          )}
        </>
      )}
    </Query>
  )
}

export default ListView
