import React from 'react'
import snarkdown from 'snarkdown'
import { translate } from 'cozy-ui/react/I18n'
import Empty from 'cozy-ui/react/Empty'
import { withClient } from 'cozy-client'

import Add from 'components/notes/add'
import icon from 'assets/icons/icon_note_empty.svg'
import useReferencedFolderForNote from 'components/notes/hooks/useReferencedFolderForNote'

const EmptyComponent = ({ t, client }) => {
  const { notesFolder } = useReferencedFolderForNote(client)
  return (
    <div className="empty">
      <Empty
        id="empty"
        icon={icon}
        title={t('Notes.Empty.welcome')}
        text={
          <p
            className="u-mb-half"
            dangerouslySetInnerHTML={{
              __html: snarkdown(
                t('Notes.Empty.after_created', {
                  notesFolder
                })
              )
            }}
          />
        }
      >
        <Add className="u-mt-1" />
      </Empty>
    </div>
  )
}

export default translate()(withClient(EmptyComponent))
