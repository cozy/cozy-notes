/* global cozy */
import React from 'react'
import Stack from 'cozy-ui/react/Stack'
import { withBreakpoints, BarContextProvider, useI18n } from 'cozy-ui/react'
import { Query, Q, useClient } from 'cozy-client'
import AppTitle from 'components/notes/List/AppTitle'
import List from 'components/notes/List/List'
import Add, { AddMobile } from 'components/notes/add'
import styles from 'components/notes/List/list.styl'
const shouldDisplayAddButton = (fetchStatus, notes) =>
  fetchStatus === 'loaded' && notes.length > 0

const ListView = ({ breakpoints: { isMobile } }) => {
  const { BarRight } = cozy.bar
  const i18n = useI18n()
  const client = useClient()

  return (
    <Query query={() => Q('io.cozy.notes')}>
      {({ data: notes, fetchStatus }) => {
        return (
          <>
            <Stack className="u-mt-1 u-mt-0-m">
              <div
                className={`${styles.appHeader} u-flex u-flex-justify-between u-flex-items-center`}
              >
                <AppTitle />
                {!isMobile && shouldDisplayAddButton(fetchStatus, notes) && (
                  <Add />
                )}
              </div>
              <List notes={notes} fetchStatus={fetchStatus} />
            </Stack>
            {isMobile && shouldDisplayAddButton(fetchStatus, notes) && (
              <BarRight>
                <BarContextProvider
                  store={client.store}
                  client={client}
                  {...i18n}
                >
                  <AddMobile />
                </BarContextProvider>
              </BarRight>
            )}
          </>
        )
      }}
    </Query>
  )
}

export default withBreakpoints()(ListView)
