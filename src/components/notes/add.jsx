import React, { useState, useCallback } from 'react'

import { withClient } from 'cozy-client'

import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'
import BarButton from 'cozy-ui/react/BarButton'

import { createNoteDocument, generateReturnUrlToNotesIndex } from 'lib/utils'

const Add = ({ t, className, client }) => {
  const [isWorking, setIsWorking] = useState(false)
  const handleClick = useCallback(
    async () => {
      setIsWorking(true)
      const { data: doc } = await createNoteDocument(client)
      window.location.href = generateReturnUrlToNotesIndex(doc)
    },
    [client]
  )

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

export const AddMobile = withClient(({ client }) => (
  <BarButton
    onClick={async () => {
      const { data: doc } = await createNoteDocument(client)
      window.location.href = generateReturnUrlToNotesIndex(doc)
    }}
    icon="plus"
    className="u-c-pointer"
  />
))
export default translate()(withClient(Add))
