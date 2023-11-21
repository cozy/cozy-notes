import React from 'react'
import { HashRouter } from 'react-router-dom'

import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import useClientErrors from 'cozy-client/dist/hooks/useClientErrors'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { useFlagSwitcher } from 'lib/debug'

const AppLayout = ({ children }) => {
  const { ClientErrors } = useClientErrors()
  const { t } = useI18n()

  const FlagSwitcher = useFlagSwitcher()

  return (
    <>
      <HashRouter>
        <Layout monoColumn={true}>
          <Main>
            <Content>{children}</Content>
          </Main>
          <IconSprite />
          <Alerter t={t} />
          <FlagSwitcher />
        </Layout>
      </HashRouter>
      <ClientErrors />
    </>
  )
}

export { AppLayout }
