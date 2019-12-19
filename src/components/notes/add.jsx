import React, { useState, useCallback } from 'react'

import { withClient } from 'cozy-client'

import Button from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'

import { schemaOrdered } from 'lib/collab/schema'
import { generateReturnUrlToNotesIndex } from 'lib/utils'

const Add = ({ t, className, client }) => {
  const [isWorking, setIsWorking] = useState(false)
  const handleClick = useCallback(async () => {
    setIsWorking(true)
    const { data: doc } = await client
      .getStackClient()
      .fetchJSON('POST', '/notes', {
        data: {
          type: 'io.cozy.notes.documents',
          attributes: {
            title: '',
            schema: schemaOrdered
          }
        }
      })

    window.location.href = generateReturnUrlToNotesIndex(doc)
  }, [])

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

export default translate()(withClient(Add))
