import React, { useEffect } from 'react'
import Spinner from 'cozy-ui/react/Spinner'
import { useClient } from 'cozy-client'
import { createNoteDocument, generateReturnUrlToNotesIndex } from 'lib/utils'

export default function New() {
  const client = useClient()
  useEffect(async () => {
    const { data: doc } = await createNoteDocument(client)
    window.location.href = await generateReturnUrlToNotesIndex(client, doc)
  }, [])
  return <Spinner size="xxlarge" middle />
}
