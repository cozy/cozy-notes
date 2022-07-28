import React from 'react'

import Stack from 'cozy-ui/transpiled/react/Stack'
import { BarContextProvider, useI18n } from 'cozy-ui/transpiled/react/'
import { Query, Q, useClient } from 'cozy-client'

import Add, { AddMobile } from 'components/notes/add'
import AppTitle from 'components/notes/List/AppTitle'
import List from 'components/notes/List/List'
import styles from 'components/notes/List/list.styl'
import { Breakpoints } from 'types/enums'
import { WithBreakpoints } from './WithBreakpoints'

const shouldDisplayAddButton = (fetchStatus, notes) =>
  fetchStatus === 'loaded' && notes.length > 0

const ListView = () => {
  const { BarRight } = cozy.bar
  const i18n = useI18n()
  const client = useClient()

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
                <BarContextProvider
                  store={client.store}
                  client={client}
                  {...i18n}
                >
                  <AddMobile />
                </BarContextProvider>
              </BarRight>
            </WithBreakpoints>
          )}
        </>
      )}
    </Query>
  )
}

export default ListView
