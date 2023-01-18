import React, { useEffect } from 'react'
import { useClient } from 'cozy-client'
import { createNoteDocument } from 'lib/utils'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { generateWebLink } from 'cozy-client'
import { useNavigate } from 'react-router-dom'

const NewRoute = () => {
  const client = useClient()
  const { subdomain: subDomainType } = client.getInstanceOptions()
  const navigate = useNavigate()

  useEffect(() => {
    const createNote = async () => {
      const { data: doc } = await createNoteDocument(client)
      const returnUrl = generateWebLink({
        slug: 'notes',
        cozyUrl: client.getStackClient().uri,
        subDomainType: subDomainType,
        pathname: '/'
      })
      const link = `/n/${doc.id}`
      navigate(link, { replace: true, state: { returnUrl } })
    }

    createNote()
  }, [client, subDomainType, navigate])

  return <Spinner size="xxlarge" middle />
}

export default NewRoute
