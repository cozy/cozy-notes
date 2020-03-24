import React, { useState, useCallback } from 'react'

import { useClient } from 'cozy-client'

import Button from 'cozy-ui/react/Button'
import { useI18n } from 'cozy-ui/react/I18n'
import BarButton from 'cozy-ui/react/BarButton'

import { createNoteDocument, generateReturnUrlToNotesIndex } from 'lib/utils'

export default function Add({ className }) {
  const { t } = useI18n()
  const client = useClient()
  const [isWorking, setIsWorking] = useState(false)
  const handleClick = useCallback(async () => {
    setIsWorking(true)
    const { data: doc } = await createNoteDocument(client)
    window.location.href = await generateReturnUrlToNotesIndex(client, doc)
  }, [client])

  return (
    <Button
      onClick={handleClick}
      type="submit"
      busy={isWorking}
      icon="plus"
      label={t('Notes.Add.add_note')}
      extension="narrow"
      className={className}
    />
  )
}

export function AddMobile(props) {
  const client = useClient() || props.client
  return (
    <BarButton
      onClick={async () => {
        const { data: doc } = await createNoteDocument(client)
        window.location.href = await generateReturnUrlToNotesIndex(client, doc)
      }}
      icon="plus"
      className="u-c-pointer"
    />
  )
}
