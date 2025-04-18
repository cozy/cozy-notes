import { createNoteDocument, generateReturnUrlToNotesIndex } from 'lib/utils'
import React, { useState, useCallback } from 'react'

import { useClient } from 'cozy-client'
import BarButton from 'cozy-ui/transpiled/react/BarButton'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

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
      startIcon={<Icon icon="plus" />}
      label={t('Notes.Add.add_note')}
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
