import React, { useEffect } from 'react'
import { useClient } from 'cozy-client'
import { createNoteDocument, generateReturnUrlToNotesIndex } from 'lib/utils'
import { generateUniversalLink } from 'cozy-ui/transpiled/react/AppLinker/native'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { generateWebLink } from 'cozy-client'
import { isFlagshipApp } from 'cozy-device-helper'
import { useWebviewIntent } from 'cozy-intent'

const NewRoute = () => {
  const client = useClient()
  const { subdomain: subDomainType } = client.getInstanceOptions()
  const isFlagship = isFlagshipApp()
  const webviewIntent = useWebviewIntent()

  useEffect(() => {
    const createNote = async () => {
      if (isFlagship && !webviewIntent) return
      const { data: doc } = await createNoteDocument(client)
      const generateLink = isFlagship ? generateUniversalLink : generateWebLink
      const returnUrl = generateLink({
        slug: 'notes',
        cozyUrl: client.getStackClient().uri,
        subDomainType: subDomainType,
        pathname: `/`
      })
      const link = await generateReturnUrlToNotesIndex(client, doc, returnUrl)

      if (isFlagship && webviewIntent) {
        return webviewIntent.call('openApp', link, { slug: 'notes' })
      } else {
        window.location.href = link
      }
    }

    createNote()
  }, [client, subDomainType, isFlagship, webviewIntent])

  return <Spinner size="xxlarge" middle />
}

export default NewRoute
