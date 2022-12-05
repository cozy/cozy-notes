import React, { useEffect, useMemo } from 'react'
import { useClient } from 'cozy-client'
import { createNoteDocument, generateReturnUrlToNotesIndex } from 'lib/utils'
import { generateUniversalLink } from 'cozy-ui/transpiled/react/AppLinker/native'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import get from 'lodash/get'
import { generateWebLink, useCapabilities } from 'cozy-client'
import { isFlagshipApp } from 'cozy-device-helper'
import { useWebviewIntent } from 'cozy-intent'

const NewRoute = () => {
  const client = useClient()
  const { capabilities } = useCapabilities(client)
  const isFlatDomain = useMemo(() => {
    return get(capabilities, 'flat_subdomains')
  }, [capabilities])
  const isFlagship = isFlagshipApp()
  const webviewIntent = useWebviewIntent()

  useEffect(() => {
    const createNote = async () => {
      const { data: doc } = await createNoteDocument(client)
      const generateLink = isFlagship ? generateUniversalLink : generateWebLink
      const returnUrl = generateLink({
        slug: 'notes',
        cozyUrl: client.getStackClient().uri,
        subDomainType: isFlatDomain ? 'flat' : 'nested',
        pathname: `/`
      })

      const link = await generateReturnUrlToNotesIndex(client, doc, returnUrl)

      if (isFlagship && webviewIntent)
        return webviewIntent.call('openApp', link, { slug: 'notes' })

      window.location.href = link
    }

    if (isFlatDomain !== undefined) {
      createNote()
    }
  }, [client, isFlatDomain, isFlagship, webviewIntent])

  return <Spinner size="xxlarge" middle />
}

export default NewRoute
